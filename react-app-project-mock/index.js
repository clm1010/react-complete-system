const koa = require('koa')
const KoaRouter = require('koa-router')
const mockList = require('./mock/index')

const app = new koa()
const router = new KoaRouter()

async function getRes(fn, ctx) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn(ctx)
      resolve(res)
    }, 1000)
  })
}

// 注册 mock 路由
mockList.forEach((item) => {
  const { url, method, response } = item
  router[method](url, async (ctx) => {
    // const res = response()
    const res = await getRes(response, ctx) // 模拟网络请求的加载状态
    ctx.body = res
  })
})

app.use(router.routes())
app.listen(3001) // port 端口

console.log('mock server running at http://localhost:3001')
