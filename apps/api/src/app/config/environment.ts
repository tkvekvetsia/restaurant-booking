import { EnvironmentModel } from '../models/environment.model';

export const environment: EnvironmentModel = {
  environment: '' as 'development' | 'production',
  port: 3000,
  host: '',
};

export const initEnvironment = (env: EnvironmentModel) => {
  environment.environment = env.environment;
  environment.port = env.port;
  environment.host = env.host;
};
