/**
 * 问卷相关常量配置
 * 包含表单选项、错误消息等静态数据
 */

export const GENDER_OPTIONS = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
  { value: 'other', label: '其他' }
] as const

export const ERROR_MESSAGES = {
  REQUIRED: '该字段为必填项',
  SUBMIT_FAILED: '提交失败，请重试'
} as const
