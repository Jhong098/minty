const config = {
  mongoURL: process.env.RAZZLE_MONGO_URL || 'mongodb://localhost:27017/test',
  port: process.env.PORT || 8080,
};

export default config;
