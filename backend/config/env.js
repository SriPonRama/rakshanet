import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/rakshanet',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-prod',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:8000',
};

