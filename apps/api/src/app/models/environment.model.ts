export interface EnvironmentModel {
  environment: 'development' | 'production';
  port: number;
  host: string;
  allowedOrigins: string[];
  jwtSecret: string;
  jwtExpiresIn: number;
}

export type NODE_ENV = 'development' | 'production';
