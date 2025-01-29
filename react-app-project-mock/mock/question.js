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

      const { keyword, isStar, isDeleted, page = 1, pageSize = 10 } = query
      // console.log(keyword, 'keyword')
      // console.log(isStar, 'isStar')
      // console.log(isDeleted, 'isDeleted')
      // console.log(page, 'page')
      // console.log(pageSize, 'pageSize')
      return {
        errno: 0,
        data: {
          list: getQuestionList({ len: pageSize, isStar, isDeleted }), // 当前页数据
          total: 100 // 总数, 用于分页
        }
      }
    }
  },
  {
    // 更新问卷
    url: '/api/question/:id',
    method: 'patch',
    response() {
      return {
        errno: 0
      }
    }
  },
  {
    // 复制问卷
    url: '/api/question/duplicate/:id',
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
    // 批量彻底删除
    url: '/api/question',
    method: 'delete',
    response() {
      return {
        errno: 0
      }
    }
  }
]
