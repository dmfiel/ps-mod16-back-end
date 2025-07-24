import express from 'express';
import { db } from '../config/connection';
import { authMiddleware } from '../utils/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    if (!req || !req['user']) throw new Error('User missing from request');
    const posts = await db.Post.find({ author: req['user']._id });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    if (!req?.body) throw new Error('Body missing from request');
    if (!req['user']) throw new Error('User missing from request');
    const newPost = await db.Post.create({
      ...req.body,
      author: req['user']._id
    });
    res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

export default router;
