

export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev', // dev, test, prod
  mongodv: process.env.MONGO_DB,
  port: process.env.PORT || 3002,
  defaultLimit: +process.env.DEFAULT_LIMIT || 7,
});