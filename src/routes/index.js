const bodyParser = require('body-parser')
const userRouter = require('./userRoute')
const adminRouter = require('./adminRouter')

module.exports = (route) => {
  route.use(bodyParser.json(), userRouter, adminRouter)
}
