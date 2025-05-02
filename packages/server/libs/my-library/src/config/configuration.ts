import * as dotenv from 'dotenv';

dotenv.config();

const APP_GATEWAY_HOST = process.env.APP_GATEWAY_HOST || '0.0.0.0';
const APP_GATEWAY_PORT = process.env.PORT || 4001;
const API_GATEWAY_HOST = process.env.API_GATEWAY_HOST || '127.0.0.1';
const API_GATEWAY_PORT = process.env.API_GATEWAY_PORT || 4000;
const API_GATEWAY_PORT_2 = process.env.API_GATEWAY_PORT_2 || 4002;
const USER_SERVICE_HOST = process.env.USER_SERVICE_HOST || '127.0.0.1';
const USER_SERVICE_PORT = process.env.USER_SERVICE_PORT || 4003;
const USER_SERVICE_REDIS_HOST =
  process.env.USER_SERVICE_REDIS_HOST || '127.0.0.1';
const USER_SERVICE_REDIS_PORT = process.env.USER_SERVICE_REDIS_PORT || 6379;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3001';
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || '';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/';

export default () => ({
  APP_GATEWAY_HOST,
  APP_GATEWAY_PORT,
  API_GATEWAY_HOST,
  API_GATEWAY_PORT,
  API_GATEWAY_PORT_2,
  USER_SERVICE_HOST,
  USER_SERVICE_PORT,
  USER_SERVICE_REDIS_HOST,
  USER_SERVICE_REDIS_PORT,
  CLIENT_URL,
  ALLOWED_ORIGINS,
  MONGO_URI,
});
