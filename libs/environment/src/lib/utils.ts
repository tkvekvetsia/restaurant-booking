import { EnvironmentModel } from './environment.model';
import { environment } from './environment';

export const initEnvironment = (env: EnvironmentModel) => {
  environment.apiUrl = env.apiUrl;
};
