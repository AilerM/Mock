const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('src/project/data/db.json')
const middlewares = jsonServer.defaults()
server.use(middlewares)

// 第二种读取json已get返回
const jsonDb = require('./src/project/data/db.json')
server.get('/jsonDb', ((req, res) => {
    let { posts } = jsonDb
    res.send(posts)
}))

// 第三种读取mock.js
const mockDb = require('./example_mock_api.js')
server.get('/mockDb', ((req, res) => {
    let { course_category } = mockDb()
    res.send(course_category)
}))

// 第一种特定读取json
server.use(router)

server.listen(3000, () => {
    console.log('JSON Server is running')
})