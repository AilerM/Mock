'use strict'
Object.defineProperty(exports, '__esModule', {
  value: true
})
const routerGet = {
  '/db': 'db.json',
  '/userInfo': 'common/userInfo.json',
  '/mock': 'example_mock_api.ts'
}
const routerPost = {
  '/bee/taskTypeList': 'task/list/taskTypeList.json',
  '/bee/definedTaskList': 'task/list/definedTaskList.json'
}

export default {
  routerGet,
  routerPost
}
module.exports = exports['default']
