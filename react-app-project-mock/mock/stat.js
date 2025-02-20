const Mock = require('mockjs')
const getStatList = require('./data/getStatList')

const Random = Mock.Random

module.exports = [
  // 答卷列表
  {
    url: '/api/stat/:questionId',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          list: getStatList(),
          total: 100 // 总数, 用于分页
        }
      }
    }
  }
]
