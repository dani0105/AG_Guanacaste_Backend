module.exports = {
  database: {
    uri: process.env.DB_URL,
    options: {
      dialectOptions:{
        ssl:{
          require:true,
          rejectUnauthorized:false
        }
      }
    },
  },
  token: {
    secret: process.env.TOKEN_SCRET,
    lifetime: process.env.TOKEN_LIFE
  },
  enviroment: process.env.NODE_ENV,
}
