// 问卷基础类型

export interface AnswerType {
  questionId: string
  answerList: AnswerList[{
    componentId: string
    value: string
  }]
}

/**
 * @description data 数据类型要求
 * @type ResDataType [key:string] 表示 key 为任意字符串， any （值）表示任意类型
 */
export interface ResDataType {
  [key: string]: any
}
