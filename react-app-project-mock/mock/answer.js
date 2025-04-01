module.exports = [
  // 新建答卷
  {
    url: '/api/answer',
    method: 'post',
    response() {
      return {
        errno: 0,
        message: 'success'
      }
    }
  }
]
