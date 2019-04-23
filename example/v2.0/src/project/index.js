const path = require('path')
const { routerGet, routerPost } = require('./router')
const resolve = src => path.join(__dirname, src)
const getJson = src => {
    try {
        return require(src)
    } catch (error) {
        console.error(error)
        return []
    }
}

const getApi = Object.keys(routerGet).map(path => ({
    path,
    method: 'get',
    data: getJson(resolve(`./data/${routerGet[path]}`))
}))

const postApi = Object.keys(routerPost).map(path => ({
    path,
    method: 'post',
    data: getJson(resolve(`./data/${routerPost[path]}`))
}))

module.exports = [
    ...getApi,
    ...postApi,
]