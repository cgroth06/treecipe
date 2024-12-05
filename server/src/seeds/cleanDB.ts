import { Composition, User } from '../models/index.js';
import process from 'process';

const cleanDB = async (): Promise<void> => {
  try {
    // Delete documents from Composition collection
    await Composition.deleteMany({});
    console.log('Composition collection cleaned.');

    // Delete documents from User collection
    await User.deleteMany({});
    console.log('User collection cleaned.');

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
