const model = require('../models').resource;

// En este archivo se configura el middleware encargado de validar los schemas de las APi's
module.exports = (req, res, next) => {
  if (req.method == "POST") {
    req.body = clearJson(req.body);
  } else if (req.method == "GET") {
    req.query = clearJson(req.query);
  } else if (req.method == "PUT") {
    req.body = clearJson(req.body);
  }
  next()
}



function clearJson(json) {
  for (var key in json) {
    if (json[key] != null) {
      if (typeof json[key] == 'object') {
        json[key] = clearJson(json[key]);
        continue;
      }
      if (typeof json[key] == 'string') {
        if (json[key].length <= 0) {
          delete json[`${key}`];
          continue;
        }
      }
    } else {
      delete json[`${key}`];
    }
  }
  return json;
}