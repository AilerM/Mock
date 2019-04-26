// 用mockjs模拟生成数据
import Mock from 'mockjs'
const { Random } = Mock
export default () => {

  const data = Mock.mock({
    'course|2': [{
      'id|+2': 1000,
      course_name: '@cword(5,10)',
      autor: '@cname(5,10)',
      college: '@ctitle(10)',
      color: '@color',
      ip: '@ip',
      // ip: Random.ip(),
      'category_Id|1-6': 1
    }],
    'course_category|6': [{
      'id|+1': 1,
      'pid': 3,
      cName: '@ctitle(4)'
    }]
  })
  return data
}
