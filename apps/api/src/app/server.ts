import express from 'express';
import router from './routes/routes';
import helmet, { crossOriginResourcePolicy } from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { environment } from './config/environment';
import { errorHandler } from './handlers';
import path from 'path';
import * as process from 'node:process';

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
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// use express.json() middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//main block

// @ts-ignore
app.use(
  '/api/images/',
  cors({
    origin: '*',
    methods: ['GET'],
    allowedHeaders: '*',
    exposedHeaders: ['Content-Length'], // Expose relevant headers if needed
    optionsSuccessStatus: 200, // Ensure successful preflight request
  }),
  express.static(path.resolve(__dirname, process.env.PATH_TO_STATIC_FILES))
);

// Set up rate limiter: maximum of twenty requests per minute
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 20,
});

app.use(limiter);
app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});
app.use('/api', router);

app.use(errorHandler);
export default app;
