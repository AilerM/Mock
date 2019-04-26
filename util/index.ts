import { join } from 'path'
import Mock from 'mockjs'
import dotenv from 'dotenv'
import variableExpansion from 'dotenv-expand'
import detect from 'detect-port'
import inquirer from 'inquirer'
import chalk from 'chalk'
const myEnv = dotenv.config()
variableExpansion(myEnv)
const resolve = (...src: string[]) => join(__dirname, ...src)
const FOLDER = process.env.MOCK_FOLDER || 'src'
const ROUTER = process.env.MOCK_ROUTER || 'router'
const DATA = process.env.MOCK_DATA || 'data'
export interface ResponseData {
  success?: boolean
  rows?: any
  results?: any
  [prop: string]: any
  [prop: number]: any
}
export interface RouterConifg {
  path: string
  method?: 'get' | 'post'
  data?: ResponseData
}

const getJson = (path: string) => {
  try {
    return require(path)
  } catch (error) {
    console.error(error)
    return []
  }
}
const initData = (routerMap: any, method: string, project: string) => {
  return Object.keys(routerMap).map<object>((path) => {
    const value = routerMap[path]
    return {
      path,
      method,
      data: getJson(resolve('../', FOLDER, project, DATA, value))
    }
  })
}

/**
 * 将分开的静态资源文件转化为json文件数组
 * @param {*} project  项目
 */
export const getData = (project: string) => {
  let { routerGet, routerPost } = getJson(resolve('../', FOLDER, project, ROUTER))
  return [
    ...initData(routerGet, 'get', project),
    ...initData(routerPost, 'post', project)
  ]
}

export const loadData = (server: any) => {
  let source = getJson(resolve('../', FOLDER))
  source && source.forEach((item: RouterConifg) => {
    const { path, method = 'post', data = {} } = item
    server[method](path, (req: any, res: any) => {
      for (let k in data) {
        if (typeof data[k] === 'function') {
          data[k] = data[k].call(data, { _req: req, Mock, Random: Mock.Random })
        }
      }
      res.send(Mock.mock(data)).end()
    })
  })
}

export const choosePort = async (defaultPort: number) => {
  const port = await detect(defaultPort)
  if (port === defaultPort) return port
  const question = {
    type: 'input',
    name: 'shouldChangePort',
    message: chalk.yellow(`${defaultPort}端口被占用，请重新指定端口`),
    default: port
  }
  const answer: { shouldChangePort: number } = await inquirer.prompt(question)
  return answer.shouldChangePort
}
