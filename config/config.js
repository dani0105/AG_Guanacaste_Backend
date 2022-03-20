module.exports = {
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  },
  token: {
    secret: process.env.TOKEN_SCRET,
    lifetime: process.env.TOKEN_LIFE
  },
  enviroment: process.env.NODE_ENV,
}
