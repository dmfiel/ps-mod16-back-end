import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createUserModel } from '../models/User';
import { createPostModel } from '../models/Post';

dotenv.config();

export const db = {
  mongoose: mongoose,
  connection: new mongoose.Connection(),
  User: mongoose.Model,
  Post: mongoose.Model,
  setupModels: () => {
    db.User = createUserModel();
    db.Post = createPostModel();
  }
};

// async
export function mongoConnect() {
  try {
    // let dbConnection = await db.mongoose.connect(dbConfig.URI);

    console.log(process.env.DB_URI);
    const conn = db.mongoose.createConnection(process.env.DB_URI);
    db.connection = conn;
    console.log('Successfully connected to MongoDB.');

    db.connection = db.connection.useDb(process.env.DB_NAME);
    console.log(`Successfully connected to database (${process.env.DB_NAME}).`);
    console.log('readyState', db.connection.readyState);

    db.setupModels();
    console.log('Database models setup');
  } catch (err) {
    console.error('Connection error', err);
    process.exit();
  }
}
