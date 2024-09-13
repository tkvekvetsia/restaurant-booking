import app from './app/server';
import * as process from 'node:process';
import { EnvironmentModel, NODE_ENV } from './app/models/environment.model';
import { initEnvironment } from './app/config/environment';

// Set the environment variables
const env: EnvironmentModel = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  environment: (process.env.NODE_ENV as NODE_ENV) || 'development',
  host: process.env.HOST || 'localhost',
};

initEnvironment(env);
// Start the server
app.listen(env.port, env.host, () => {
  console.log(`[ ready ] http://${env.host}:${env.port}`);
});
