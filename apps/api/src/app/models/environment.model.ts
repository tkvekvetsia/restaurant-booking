export interface EnvironmentModel {
  environment: 'development' | 'production';
  port: number;
  host: string;
}

export type NODE_ENV = 'development' | 'production';
