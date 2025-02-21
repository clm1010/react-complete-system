/**
 * @description 生成组件列表
 */

// const Mock = require('mockjs')

// const Random = Mock.Random

/**
 * @description 获取组件列表
 * @returns 组件列表
 */
function getComponentList() {
  return [
    // Info 组件
    {
      fe_id: 'c1', // 注意，由于统计页，左侧和中间需要数据完全一致，所以这里的要写死 fe_id，不能用 Random.id()
      type: 'questionInfo', // 组件类型，不能重复，前后端统一好
      title: '问题信息',
      isHidden: false, // 控制组件是否隐藏
      isLocked: false, // 控制组件是否锁定
      props: { title: '个人信息调研', desc: '问卷描述...' }
    },
    // Title 组件
    {
      fe_id: 'c2',
      type: 'questionTitle', // 组件类型，不能重复，前后端统一好
      title: '标题',
      isHidden: false, // 控制组件是否隐藏
      isLocked: false, // 控制组件是否锁定
      props: { text: '个人标题信息', level: 1, isCenter: false }
    },
    // Input 组件
    {
      fe_id: 'c3',
      type: 'questionInput',
      title: '输入框1',
      isHidden: false, // 控制组件是否隐藏
      isLocked: false,
      props: { title: '你的姓名', placeholder: '请输入姓名...' }
    },
    // Input 组件
    {
      fe_id: 'c4',
      type: 'questionInput',
      title: '输入框2',
      isHidden: false, // 控制组件是否隐藏
      isLocked: false,
      props: { title: '你的电话', placeholder: '请输入电话...' }
    },
    // Textarea 组件
    {
      fe_id: 'c5',
      type: 'questionTextarea',
      title: '多行文本框',
      isHidden: false, // 控制组件是否隐藏
      isLocked: false, // 控制组件是否锁定
      props: { title: '你的爱好', placeholder: '请输入你的爱好...' }
    },
    // Paragraph 组件
    {
      fe_id: 'c6',
      type: 'questionParagraph',
      title: '段落',
      isHidden: false, // 控制组件是否隐藏
      isLocked: false, // 控制组件是否锁定
      props: {
        text: '这是一段文字',
        isCenter: false
      }
    },
    // Radio 组件
    {
      fe_id: 'c7',
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
      fe_id: 'c8',
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

module.exports = getComponentList
