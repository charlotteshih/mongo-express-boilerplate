module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  PROD_URL: process.env.MONGO_URI ||  'mongodb://localhost/DATABASE-NAME-HERE',
  TEST_DB: process.env.TEST_DB,
  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET_HERE',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '24h'
};