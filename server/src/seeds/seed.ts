import db from '../config/connection.js';
import { Recipe, User } from '../models/index.js';
import cleanDB from './cleanDB.js';
import userData from './userData.json' with { type: 'json'};
import { seedRecipes } from './createSeed.js';

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    const data = await seedRecipes()

    await Recipe.insertMany(data);
    for (let user of userData) {
      const userSeed = new User(user);

      await userSeed.save()
  }
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
