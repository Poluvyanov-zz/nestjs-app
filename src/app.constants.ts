import 'dotenv/config';

export const DEBUG: any = process.env.DEBUG || true;
export const NODE_ENV: any = process.env.NODE_ENV || 'local';

export const ENV_IS_LOCAL = NODE_ENV === 'local';
export const ENV_IS_STAGING = NODE_ENV === 'staging';
export const ENV_IS_PRODUCTION = NODE_ENV === 'production';
export const ENV_IS_TESTING = NODE_ENV === 'testing';

export const SERVER_PORT: any = process.env.SERVER_PORT || 3000;

export const DB_HOST: any = process.env.DB_HOST || 'localhost';
export const DB_PORT: any = process.env.DB_PORT || 30015;
export const DB_USERNAME: any = process.env.DB_USERNAME || '';
export const DB_PASSWORD: any = process.env.DB_PASSWORD || '';
export const DB_DATABASE: any = process.env.DB_DATABASE || '';
export const DB_CONNECTION_WITH_NO_SSL: any =
  process.env.DB_CONNECTION_WITH_NO_SSL !== 'true';

export const JWT_SECRET: any = process.env.JWT_SECRET || '';
export const JWT_ACCESS_TOKEN_TTL: any =
  parseInt(process.env.ACCESS_TOKEN_TTL, 10) || 60 * 5;
export const JWT_REFRESH_TOKEN_TTL: any =
  parseInt(process.env.ACCESS_TOKEN_TTL, 10) || 30;
export const SALT: any = process.env.SALT || '';
