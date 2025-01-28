import { Recipe, User } from '../models/index.js';
import process from 'process';

const cleanDB = async (): Promise<void> => {
  try {
    // Delete documents from Recipe Box
    await Recipe.collection.drop();
    console.log('Recipe Box cleaned.');

    // Delete documents from User recipe box
    await User.collection.drop();
    console.log('User recipe box cleaned.');

  } catch (err) {
    console.error('Error cleaning recipe box:', err);
    process.exit(1);
  }
};

export default cleanDB;