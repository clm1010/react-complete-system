const Mock = require('mockjs')
const getQuestionList = require('./data/getQuestionList')
const Random = Mock.Random

module.exports = [
  {
    // 获取单个问卷
    url: '/api/question/:id',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle()
        }
      }
    }
  },
  {
    // 创建问卷
    url: '/api/question',
    method: 'post',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id()
        }
      }
    }
  },
  {
    // 获取（查询）问卷列表
    url: '/api/question',
    method: 'get',
    response(ctx) {
      // console.log('ctx', ctx.url)
      // const { url = '' } = ctx
      // console.log('url:', url)

      const { query = {} } = ctx
      // const isDeleted = url.indexOf('isDeleted=true') >= 0
      // console.log(isDeleted)

      const { keyword, isStar, isDeleted } = query
      console.log(keyword, 'keyword')
      console.log(isStar, 'isStar')
      console.log(isDeleted, 'isDeleted')
      return {
        errno: 0,
        data: {
          list: getQuestionList({ len: 20, isStar, isDeleted }), // 当前页数据
          total: 100 // 总数, 用于分页
        }
      }
    }
  }
]
