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
          title: Random.ctitle(),
          // 组件列表
          componentList: [
            // Title 组件
            {
              id: Random.id(),
              type: 'questionTitle', // 组件类型，不能重复，前后端统一好
              title: '标题',
              props: { text: '个人信息调研', level: 1, isCenter: false }
            },
            // Input 组件
            {
              id: Random.id(),
              type: 'questionInput',
              title: '输入框1',
              props: { text: '你的姓名', placeholder: '请输入姓名...' }
            },
            // Input 组件
            {
              id: Random.id(),
              type: 'questionInput',
              title: '输入框2',
              props: { text: '你的电话', placeholder: '请输入电话...' }
            }
          ]
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
