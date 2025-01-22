const Mock = require('mockjs')

const Random = Mock.Random

module.exports = [
  {
    url: '/api/test',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          name: Random.cname()
        }
      }
    }
  }
]
