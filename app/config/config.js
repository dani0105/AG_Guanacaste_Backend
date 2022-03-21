module.exports = {
  database: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  },
  token: {
    secret: process.env.TOKEN_SCRET,
    lifetime: process.env.TOKEN_LIFE
  },
  enviroment: process.env.NODE_ENV,
}
