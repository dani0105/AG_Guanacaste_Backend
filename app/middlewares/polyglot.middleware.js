const Polyglot = require('node-polyglot');
const messages = require('../i18n/i18n');

module.exports = (req, res, next) => {
  // Get the locale from express-locale
  const locale = req.locale.language

  // Start Polyglot and add it to the req
  req.polyglot = new Polyglot()

  // Decide which phrases for polyglot will be used
  if (locale == 'es') {
    req.polyglot.extend(messages.es)
  } else {
    req.polyglot.extend(messages.en)
  }

  next()
}