import { EnvironmentModel } from '../models/environment.model';

export const environment: EnvironmentModel = {} as EnvironmentModel;

export const initEnvironment = (env: EnvironmentModel) => {
  environment.environment = env.environment;
  environment.port = env.port;
  environment.host = env.host;
  environment.allowedOrigins = env.allowedOrigins;
  environment.jwtSecret = env.jwtSecret;
  environment.jwtExpiresIn = env.jwtExpiresIn;
};
