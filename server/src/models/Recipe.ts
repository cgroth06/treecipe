import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'mongoose';

// Define an interface for the Composition document
/* interface IComment extends Document {
    commentText: string;
    createdAt: Date;
} */

interface IRecipe extends Document {
    recipeTitle: string;
    recipeText: string;
    recipeAuthor: string;
    recipes: ObjectId[];
    recipeBox: ObjectId[];
    createdAt: Date;
    tags: string[];
    photoUrl: string;
    /* comments: IComment[]; */
}

// Define the schema for the Comment subdocument
/* const commentSchema = new Schema<IComment>(
    {
        commentText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
    },
    {
        _id: false,
        toJSON: { getters: true },
        toObject: { getters: true },
        timestamps: true,
    }
); */

// Define the schema for the recipe document
const recipeSchema = new Schema<IRecipe>(
    {
        recipeTitle: {
            type: String,
            required: true,
            minlength: 1,
        },
        recipeText: {
            type: String,
            required: true,
            minlength: 1,
            // maxlength: 280,
            trim: true,
        },
        recipeAuthor: {
            type: String,
            required: true,
            trim: true,
        },
        tags: {
            type: [String],
        },
        photoUrl: {
            type: String,
            required: false,
        },
        /* comments: [commentSchema], */
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

const Recipe = model<IRecipe>('Recipe', recipeSchema);

export default Recipe;
