const jsonServer = require('json-server')
const Mock = require('mockjs')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const source = require('./src')

server.use(middlewares)

function loadData(source, server) {
    for (const { path, method = 'post', callback, data = {} }
        of source) {
        let handler = null
        if (!path) throw new Error(`The parameter 'path' is required!`)

        if (typeof callback === 'function') {
            handler = function(req, res) {
                return callback({ req, res, Mock, Random: Mock.Random, _ })
            }
        } else {
            handler = function(req, res) {
                for (let k in data) {
                    if (typeof data[k] === 'function') {
                        data[k] = data[k].call(data, { _req: req, Mock, Random: Mock.Random, _ })
                    }
                }
                res.send(Mock.mock(data)).end()
            }
        }

        if (method === 'post') {
            server.post(path, handler)
        } else {

            server.get(path, handler)
        }
    }
}

loadData(source, server)

server.listen(3000, () => {
    console.log('JSON Server is running')
})