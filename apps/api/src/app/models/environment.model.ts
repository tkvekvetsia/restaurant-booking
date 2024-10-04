export interface EnvironmentModel {
  environment: 'development' | 'production';
  port: number;
  host: string;
  allowedOrigins: string[];
  jwtSecret: string;
  jwtExpiresIn: number;
  pathToUploadFolder: string;
  pathToStaticFiles: string;
}

export type NODE_ENV = 'development' | 'production';
