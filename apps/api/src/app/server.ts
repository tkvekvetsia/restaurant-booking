import express from 'express';
import { environment } from './config/environment';

const app = express();

app.get('/', (req, res) => {
  console.log(environment);
  res.send({ message: 'Hello API' });
});

export default app;
