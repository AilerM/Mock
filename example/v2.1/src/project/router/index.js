const routerGet = {
    '/db': 'db.json',
    '/userInfo': 'common/userInfo.json',
    '/test': 'example_mock_api.js',
}
const routerPost = {
    '/bee/taskTypeList': 'task/list/taskTypeList.json',
    '/bee/definedTaskList': 'task/list/definedTaskList.json'
}


module.exports = {
    routerGet,
    routerPost
}