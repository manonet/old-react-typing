const path = require('path')
const express = require('express')

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, 'index.html')
    const publicPath = express.static(path.join(__dirname, 'public'))
    const apiPath = express.static(path.join(__dirname, 'api'))

    app.use('/public', publicPath)
    app.use('/api', apiPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
