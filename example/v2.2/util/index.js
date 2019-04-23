const path = require('path')
const Mock = require('mockjs')
const detect = require('detect-port')
const chalk = require('chalk')
const inquirer = require('inquirer')
const dotenv = require('dotenv')
const variableExpansion = require('dotenv-expand')
const myEnv = dotenv.config()
variableExpansion(myEnv)
const resolve = (...src) => path.join(__dirname, ...src)
const FOLDER = process.env.MOCK_FOLDER || 'src'
const ROUTER = process.env.MOCK_ROUTER || 'router'
const DATA = process.env.MOCK_DATA || 'data'


/**
 * 引入文件
 * @param {*} 资源路径 
 */
const getJson = src => {
    try {
        return require(src)
    } catch (error) {
        console.error(error)
        return []
    }
}

/**
 * 路由json文件导出成指定格式
 * @param {*} src  路由对象：json
 * @param {*} type  请求方式：method
 * @param {*} project 项目目录名称
 */
const initData = (src, type, project) => {
    return Object.keys(src).map(path => ({
        path,
        method: type,
        data: getJson(resolve('../', FOLDER, project, DATA, src[path]))
    }))
}

/**
 * 将分开的静态资源文件转化为json文件数组
 * @param {*} project  项目
 */
const getData = (project) => {
    let { routerGet, routerPost } = require(resolve('../', FOLDER, project, ROUTER))
    return [
        ...initData(routerGet, 'get', project),
        ...initData(routerPost, 'post', project)
    ]
}

/**
 * 将json文件转化为路由
 * @param {*} source 路由文件
 * @param {*} server json-server对象
 */
const loadData = (server) => {
    let source = require(`../${FOLDER}`)
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


/**
 * 端口占用
 * @param {*} host 
 * @param {*} defaultPort 
 */
const choosePort = (host, defaultPort) =>
    detect(defaultPort, host).then(
        port =>
        new Promise(resolve => {
            if (port === defaultPort) return resolve(port)
            const question = {
                type: 'input',
                name: 'shouldChangePort',
                message: chalk.yellow(`${defaultPort}端口被占用，请重新指定端口`),
                default: port
            }
            inquirer.prompt(question).then(answer => {
                resolve(answer.shouldChangePort)
            })
        }),
        err => {
            throw new Error(
                chalk.red(`Could not find an open port at ${chalk.bold(host)}.`) +
                '\n' +
                ('Network error message: ' + err.message || err) +
                '\n'
            );
        }
    )


module.exports = {
    loadData,
    choosePort,
    getData
}