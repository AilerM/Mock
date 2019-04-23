# JsonServer结合Mock伪造数据
  通过mockjs生成假数据，用json-server启动一个本地服务生成对应的接口，nodemon监控文件的改动重启服务


## 生成接口
- config 目录结构介绍
```js
module.exports = {
    dev: {
        folder: 'src', //src 放项目目录
        data: 'data', //data 放json js文件目录
        router: 'router', //router 放路由目录 
        host: '0.0.0.0', // 默认启动host
        port: 3000 // 监听端口号
    }
}
```

```js 骨架
[
  {
    path: '/example',
    method: 'get',
    data: require('')
  }
]
server.post(path, handler)
```

- 使用
```
1: 在src目录下面，按照例子project创建
2: 在src/index.js中引入，需要启动路由的项目
3: router/index.js中写所有get post 路由
4: 可以引入js 也可以直接引入json
```

- 你想接纳这种写法，就是自己写一遍