/**
 * @description 生成问卷列表
 */

const Mock = require('mockjs')

const Random = Mock.Random

const getQuestionList = (opt = {}) => {
  const { len = 10, isStar = false, isDeleted = false } = opt
  const list = []
  for (let i = 0; i < len; i++) {
    list.push({
      _id: Random.id(),
      title: Random.ctitle(),
      isPublished: Random.boolean(),
      isStar,
      answerCount: Random.natural(50, 100),
      createdAt: Random.datetime(),
      isDeleted // 是否已删除 假删除
    })
  }
  return list
}

module.exports = getQuestionList
