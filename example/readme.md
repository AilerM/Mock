## Mockjs语法

### 目录
- 一、安装
- 二、语法规范
- 三、Mock.Random

#### 一、安装
```shell
# 安装
npm install mockjs
```

```js
// 使用 Mock
var Mock = require('mockjs')
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
```

--- 

#### 二、语法规范
Mock.js 的语法规范包括两部分
- 1:数据模板定义规范（Data Template Definition，DTD）
- 2:数据占位符定义规范（Data Placeholder Definition，DPD）

#### 2.1数据模板定义规范 DTD
```js
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
// 生成规则 有 7 种格式：

'name|min-max': value
// string 通过重复 string 生成一个字符串，重复次数大于等于 min，小于等于 max
// number 生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型
// object 从属性值 object 中随机选取 min 到 max 个属性。
// array 通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max。

'name|count': value
//string 通过重复 string 生成一个字符串，重复次数等于 count。
//number 属性值自动加 1，初始值为 number。
//object 从属性值 object 中随机选取 count 个属性。
//array 通过重复属性值 array 生成一个新数组，重复次数为 count。

'name|min-max.dmin-dmax': value
//number 生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位
/**
Mock.mock({
    'number1|1-100.1-10': 1,
    'number2|123.1-10': 1,
    'number3|123.3': 1,
    'number4|123.10': 1.123
})
// =>
{
    "number1": 12.92,
    "number2": 123.51,
    "number3": 123.777,
    "number4": 123.1231091814
}
**/
'name|1': boolean
// 随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。

'name|min-max.dcount': value
'name|count.dmin-dmax': value
'name|count.dcount': value
'name|+step': value

'name': regexp
//根据正则表达式 regexp 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。

/**
Mock.mock({
    'regexp1': /[a-z][A-Z][0-9]/,
    'regexp2': /\w\W\s\S\d\D/,
    'regexp3': /\d{5,10}/
})
// =>
{
    "regexp1": "pJ7",
    "regexp2": "F)\fp1G",
    "regexp3": "561659409"
}
**/

```

#### 2.2数据占位符定义规范（DPD）
- @占位符
- @占位符(参数 [, 参数])

- 用 @ 来标识其后的字符串是 占位符。
- 占位符 引用的是 Mock.Random 中的方法。
- 通过 Mock.Random.extend() 来扩展自定义占位符。
- 占位符 也可以引用 数据模板 中的属性。
- 占位符 会优先引用 数据模板 中的属性。
- 占位符 支持 相对路径 和 绝对路径。

```js
Mock.mock({
    name: {
        first: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
})
// =>
{
    "name": {
        "first": "Charles",
        "middle": "Brenda",
        "last": "Lopez",
        "full": "Charles Brenda Lopez"
    }
}
```
--- 

### 三、Mock.Random

```js
var Random = Mock.Random
Random.email()
// => "n.clark@miller.io"
Mock.mock('@email')
// => "y.lee@lewis.org"
Mock.mock( { email: '@email' } )
// => { email: "v.lewis@hall.gov" }
```

| type | method |
| --- | --- |
|Basic | boolean, natural, integer, float, character, string, range, date, time, datetime, now|
|Image | image, dataImage |
|Color | Color |
|Text | paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle |
| Name | first, last, name, cfirst, clast, cname |
| Web | url, domain, email, ip, tld |
| Address | area, region |
| Helper | capitalize, upper, lower, pick, shuffle |
| Miscellaneous | guid, id |




[mockjs](https://github.com/nuysoft/Mock/wiki/Getting-Started)