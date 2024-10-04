import app from './app/server';
import * as process from 'node:process';
import { EnvironmentModel, NODE_ENV } from './app/models/environment.model';
import { initEnvironment } from './app/config/environment';

// Set the environment variables
const env: EnvironmentModel = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  environment: (process.env.NODE_ENV as NODE_ENV) || 'development',
  host: process.env.HOST || 'localhost',
  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['*'],
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN),
  pathToUploadFolder: process.env.PATH_TO_UPLOAD_FOLDER || './assets',
  pathToStaticFiles: process.env.PATH_TO_STATIC_FILES || './assets',
};

initEnvironment(env);
// Start the server
app.listen(env.port, () => {
  if (env.environment === 'development') {
    console.log(`[ ready ] http://localhost:${env.port}`);
  }
});
