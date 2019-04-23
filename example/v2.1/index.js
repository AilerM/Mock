const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const { loadData, choosePort } = require('./util')
const { dev } = require('./config')
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || dev.port || 3000
const HOST = process.env.HOST || dev.host || '0.0.0.0'

server.use(middlewares)
loadData(server)
choosePort(HOST, DEFAULT_PORT).then(port => {
    if (!port) return
    server.listen(port, () => {
        console.log(`JSON Server is running at http://localhost:${port}`)
    })
})