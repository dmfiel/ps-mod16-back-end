import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import testRoutes from './routes/testRoutes';
import userRoutes from './routes/users';
import postRoutes from './routes/postRoutes';
import cors from 'cors';
import { mongoConnect } from './config/connection';

dotenv.config();

const app = express();
const LISTEN_PORT = process.env.PORT || 3002;

mongoConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
// use cors to specify where the front-end server can be located
const allowedOrigins = [
  'https://fiel.us',
  'http://fiel.us',
  'http://localhost:5173',
  'http://localhost:5174'
];

// allowed !orgin (undefined) to accept Postman transactions
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Origin site (${origin}) not allowed by CORS`));
    }
  }
};
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use('/', testRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(LISTEN_PORT, () =>
  console.log(
    `Server listening on port ${LISTEN_PORT}  http://localhost:${LISTEN_PORT}`
  )
);
