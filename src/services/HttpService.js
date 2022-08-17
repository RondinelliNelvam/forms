class HttpService {
  static browserReturn(status, data, res) {
    return res.status(status).json({ status, data })
  }

  static checkError(status, data, res) {}
}

module.exports = HttpService
