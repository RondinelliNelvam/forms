const bodyParser = require('body-parser')

module.exports = (route) => {
  route.use(bodyParser.json())
}
