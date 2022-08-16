const bodyParser = require('body-parser')
const userRouter = require('./userRoute')
const adminRouter = require('./adminRouter')
const userLoginRouter = require('./userLoginRouter')

module.exports = (route) => {
  route.use(bodyParser.json(), userRouter, adminRouter, userLoginRouter)
}

//TODO Adicionar o Prefix
