import { Recipe, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
import mongoose from 'mongoose';

// Define types for the arguments
interface AddUserArgs {
  input: {
    name: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  name: string;
}

interface RecipeArgs {
  recipeId: string;
}

interface AddRecipeArgs {
  input: {
    recipeTitle: string;
    recipeText: string;
    recipeAuthor: string;
    tags: string[];
  }
}

interface UpdateRecipeArgs {
  recipeId: string;
  input: {
    recipeTitle: string;
    recipeText: string;
    recipeAuthor: string;
    tags: string[];
  };
}

/* interface AddCommentArgs {
  compositionId: string;
  commentText: string;
} */

/* interface RemoveCommentArgs {
  compositionId: string;
  commentId: string;
} */

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('recipes');
    },
    user: async (_parent: any, { name }: UserArgs) => {
      return User.findOne({ name }).populate('recipes');
    },
    recipes: async () => {
      return await Recipe.find().sort({ createdAt: -1 });
    },
    recipe: async (_parent: any, { recipeId }: RecipeArgs) => {
      return await Recipe.findOne({ _id: recipeId });
    },
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their recipes
      if (context.user) {
        return User.findOne({ _id: context.user._id })
        .populate('recipes')
        .populate('recipeBox');
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
    searchRecipesAndUsers: async (_parent: unknown, { query }: {query: string}) => {
      const searchRegex = new RegExp(query, 'i'); // Case-insensitive search

      const users = await User.find({
        $or: [
          { name: searchRegex },
        ],
      });

      const recipes = await Recipe.find({
        $or: [
          { recipeAuthor: searchRegex },
          { recipeTitle: searchRegex },
          { recipeText: searchRegex },
          { tags: { $in: [searchRegex] } }, // Search tags array
        ],
      });

      return { users, recipes };
    },
    checkRecipeBoxStatus: async (_: any, { recipeId }: { recipeId: string }, { user }: any) => {
      if (!user) {
        throw new AuthenticationError('You need to be logged in!');
      }
    
      // Query the User model directly to check if the recipeId is in the recipe box
      const userData = await User.findById(user._id).populate('recipeBox');
      if (!userData) {
        throw new AuthenticationError('User not found.');
      }
    
      // Check if the recipe is in the user's recipe box
      const isInRecipeBox = userData.recipeBox.some((recipe: any) => recipe._id.toString() === recipeId);
      return { inRecipeBox: isInRecipeBox };
    }
    

  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided name, email, and password
      const user = await User.create({ ...input });

      // Sign a token with the user's information
      const token = signToken(user.name, user.email, user._id);

      // Return the token and the user
      return { token, user };
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });

      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      // Sign a token with the user's information
      const token = signToken(user.name, user.email, user._id);

      // Return the token and the user
      return { token, user };
    },
    addRecipe: async (_parent: any, { input }: AddRecipeArgs, context: any) => {
      if (context.user) {
        const recipe = await Recipe.create({ ...input });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { recipes: recipe._id } }
        );

        return recipe;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    updateRecipe: async (_parent: any, { recipeId, input }: UpdateRecipeArgs, context: any) => {
      if (context.user) {
        // Find the user and check if the recipeId exists in the user's recipes array
        const user = await User.findById(context.user._id);
        if (!user) {
          throw new AuthenticationError('User not found.');
        }
    
        // Check if the recipeId is in the user's recipes
        if (!user.recipes.includes(new mongoose.Types.ObjectId(recipeId))) {
          throw new Error('You are not the author of this recipe.');
        }
    
        console.log('Updating recipe with ID:', recipeId);
        console.log('Input data:', input);
    
        // Now, safely update the recipe using $set
        const recipe = await Recipe.findOneAndUpdate(
          { _id: recipeId },
          { $set: input },
          { new: true, runValidators: true }
        );
    
        if (!recipe) {
          throw new Error('recipe not found.');
        }
    
        return recipe;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    /* addComment: async (_parent: any, { recipeId, commentText }: AddCommentArgs, context: any) => {
      if (context.user) {
        return recipe.findOneAndUpdate(
          { _id: recipeId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.name },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    }, */
    removeRecipe: async (_parent: any, { recipeId }: RecipeArgs, context: any) => {
      if (context.user) {
        // Find the user and check if the RecipeId exists in the user's Recipes array
        const user = await User.findById(context.user._id);
        if (!user) {
          throw new AuthenticationError('User not found.');
        }
    
        // Check if the RecipeId is in the user's Recipes
        if (!user.recipes.includes(new mongoose.Types.ObjectId(recipeId))) {
          throw new Error('You are not the author of this recipe.');
        }
    
        // Now, safely delete the recipe
        const recipe = await Recipe.findOneAndDelete({
          _id: recipeId
        });
    
        if (!recipe) {
          throw new Error('recipe not found.');
        }
    
        // Remove the recipe from the user's recipes array
        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { recipes: recipeId } }
        );
    
        return recipe;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    followUser: async (_parent: any, { followId }: { followId: string }, context: any) => {
      if (context.user) {
        if (context.user._id === followId) {
          throw new Error("You cannot follow yourself.");
        }

        // Use $addToSet to ensure no duplicates
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { follows: followId } }, // Ensures no duplicate follows
          { new: true }
        ).populate('follows'); // Populate to return updated follows data

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    unfollowUser: async (_parent: any, { followId }: { followId: string }, context: any) => {
      if (context.user) {
        // Ensure the user is not trying to unfollow themselves
        if (context.user._id.toString() === followId) {
          throw new Error("You cannot unfollow yourself.");
        }

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { follows: followId } }, // Removes the followId from the follows array
          { new: true } // Return the updated user
        ).populate('follows'); //  update follows data

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    saveToRecipeBox: async (_parent: any, { recipeId }: { recipeId: string }, context: any) => {
      if (context.user) {
        // Check if the recipe exists
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
          throw new Error('recipe not found.');
        }

        // user cannot save their own recipe
        if (recipe.recipeAuthor === context.user.name) {
          throw new Error('You cannot save your own recipe.');
        }

        // no duplicate recipes in the library
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { library: recipeId } }, // ensures unique recipes
          { new: true }
        ).populate('library'); //update library

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeFromLibrary: async (_parent: any, { recipeId }: { recipeId: string }, context: any) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { library: recipeId } }, // recipeId from the library
          { new: true }
        ).populate('library'); // update library

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    /* removeComment: async (_parent: any, { recipeId, commentId }: RemoveCommentArgs, context: any) => {
      if (context.user) {
        return Recipe.findOneAndUpdate(
          { _id: recipeId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.name,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    }, */
  },
};

export default resolvers;
