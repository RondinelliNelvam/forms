const bodyParser = require('body-parser')
const userRouter = require('./userRoute')

module.exports = (route) => {
  route.use(bodyParser.json(), userRouter)
}
