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
          desc: '问卷描述',
          js: '',
          css: '',
          isPublished: true,
          // 组件列表
          componentList: [
            // Info 组件
            {
              fe_id: Random.id(),
              type: 'questionInfo', // 组件类型，不能重复，前后端统一好
              title: '问题信息',
              isHidden: false, // 控制组件是否隐藏
              isLocked: false, // 控制组件是否锁定
              props: { title: '个人信息调研', desc: '问卷描述...' }
            },
            // Title 组件
            {
              fe_id: Random.id(),
              type: 'questionTitle', // 组件类型，不能重复，前后端统一好
              title: '标题',
              isHidden: false, // 控制组件是否隐藏
              isLocked: false, // 控制组件是否锁定
              props: { text: '个人标题信息', level: 1, isCenter: false }
            },
            // Input 组件
            {
              fe_id: Random.id(),
              type: 'questionInput',
              title: '输入框1',
              isHidden: false, // 控制组件是否隐藏
              isLocked: false,
              props: { title: '你的姓名', placeholder: '请输入姓名...' }
            },
            // Input 组件
            {
              fe_id: Random.id(),
              type: 'questionInput',
              title: '输入框2',
              isHidden: false, // 控制组件是否隐藏
              isLocked: false,
              props: { title: '你的电话', placeholder: '请输入电话...' }
            },
            // Textarea 组件
            {
              fe_id: Random.id(),
              type: 'questionTextarea',
              title: '多行文本框',
              isHidden: false, // 控制组件是否隐藏
              isLocked: false, // 控制组件是否锁定
              props: { title: '你的爱好', placeholder: '请输入你的爱好...' }
            },
            // Paragraph 组件
            {
              fe_id: Random.id(),
              type: 'questionParagraph',
              title: '段落',
              isHidden: false, // 控制组件是否隐藏
              isLocked: false, // 控制组件是否锁定
              props: {
                text: '这是一段文字', isCenter: false
              }
            },
            // Radio 组件
            {
              fe_id: Random.id(),
              type: 'questionRadio',
              title: '单选',
              isHidden: false, // 控制组件是否隐藏
              isLocked: false, // 控制组件是否锁定
              props: {
                title: '单选标题',
                isVertical: false,
                options: [
                  { value: 'item1', text: '选项1' },
                  { value: 'item2', text: '选项2' },
                  { value: 'item3', text: '选项3' }
                ],
                value: ''
              }
            },
            // Checkbox 组件
            {
              fe_id: Random.id(),
              type: 'questionCheckbox',
              title: '多选',
              isHidden: false, // 控制组件是否隐藏
              isLocked: false, // 控制组件是否锁定
              props: {
                title: '多选标题',
                isVertical: false,
                list: [
                  { value: 'item1', text: '选项1', checked: false },
                  { value: 'item2', text: '选项2', checked: false },
                  { value: 'item3', text: '选项3', checked: false }
                ]
              }
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
