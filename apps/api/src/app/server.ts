import express from 'express';
import router from './routes/routes';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { environment } from './config/environment';
import { errorHandler } from './handlers';
import path from 'path';

const app = express();
// cors middleware
app.use(morgan('dev'));

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: '*',
  })
);

// security block
//compression
app.use(compression());

// helmet
app.use(helmet());

// Set up rate limiter: maximum of twenty requests per minute
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 20,
});

app.use(limiter);

// use express.json() middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//main block

app.use(
  '/api/images/',
  express.static(path.resolve('./../', 'assets', 'images'))
);

app.get('/', (req, res) => {
  throw new Error('Something went wrong');
  res.send({ message: 'Hello API' });
});
app.use('/api', router);

app.use(errorHandler);
export default app;
