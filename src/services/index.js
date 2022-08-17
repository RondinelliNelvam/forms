const SystemServices = require('./SystemServices')
const AuthorizedPersonsServices = require('./AuthorizedPersonsService')
const DemandsService = require('./DemandsService')
const ReferenceLinkServices = require('./ReferenceLinkServices')
const UserLoginServices = require('./UserLoginServices')
const HttpService = require('./HttpService')

module.exports = {
  SystemServices: SystemServices,
  AuthorizedPersonsServices: AuthorizedPersonsServices,
  DemandsService: DemandsService,
  ReferenceLinkServices: ReferenceLinkServices,
  UserLoginServices: UserLoginServices,
  HttpService: HttpService,
}
