const Mock = require('mockjs')

const Random = Mock.Random

module.exports = [
  {
    // 获取用户信息
    url: '/api/user/info',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          username: Random.title(),
          nickname: Random.cname()
        }
        // // 测试用户信息获取失败，页面跳转到登录页
        // errno: 100,
        // msg: '获取用户信息失败'
      }
    }
  },
  {
    // 用户注册
    url: '/api/user/register',
    method: 'post',
    response() {
      return {
        errno: 0
      }
    }
  },
  {
    // 用户登录
    url: '/api/user/login',
    method: 'post',
    response() {
      return {
        errno: 0,
        data: {
          token: Random.word(20)
        }
      }
    }
  }
]