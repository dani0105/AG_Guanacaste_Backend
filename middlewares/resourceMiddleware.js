const model = require('../models').resource;

// En este archivo se configura el middleware encargado de validar los schemas de las APi's
module.exports = (resourceName) => async (req, res, next) => {
  const [resource,created] = await model.findOrCreate({
    where: {
      name:resourceName
    }
  });

  req.resource = resource;
  next();
}


