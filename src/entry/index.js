if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Root')
} else {
  module.exports = require('./Root.dev')
}
