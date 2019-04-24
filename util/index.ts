import { join } from 'path'
import Mock from 'mockjs'
const resolve = (...src: string[]) => join(__dirname, ...src)
const FOLDER = process.env.MOCK_FOLDER || 'src'
const ROUTER = process.env.MOCK_ROUTER || 'router'
const DATA = process.env.MOCK_DATA || 'data'

const getJson = (src: any) => {
  try {
    return require(src)
  } catch (error) {
    console.error(error)
    return []
  }
}

const initData = (src: any, type: string, project: string) => {
  return Object.keys(src).map<object>((path) => {
    const value = src[path]
    return {
      path,
      method: type,
      data: getJson(resolve('../', FOLDER, project, DATA, value))
    }
  })
}

/**
 * 将分开的静态资源文件转化为json文件数组
 * @param {*} project  项目
 */
export const getData = (project: string) => {
  let { routerGet, routerPost } = require(resolve('../', FOLDER, project, ROUTER))
  return [
    ...initData(routerGet, 'get', project),
    ...initData(routerPost, 'post', project)
  ]
}

export const loadData = (server: any) => {
  let source = require(`../${FOLDER}`)
  for (const { path, method = 'post', callback, data = {} }
    of source) {
    let handler = null
    if (!path) throw new Error(`The parameter 'path' is required!`)

    if (typeof callback === 'function') {
      handler = function (req: any, res: any) {
        return callback({ req, res, Mock, Random: Mock.Random })
      }
    } else {
      handler = function (req: any, res: any) {
        for (let k in data) {
          if (typeof data[k] === 'function') {
            data[k] = data[k].call(data, { _req: req, Mock, Random: Mock.Random })
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
