import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // res.status(200).json({ name: 'Hello from Next.js!' })

  if (req.method !== 'POST') {
    // 不是 POST 请求, 则返回错误信息！
    res.status(200).json({ errno: -1, msg: 'Method 错误！' })
  }

  console.log(req.body, 'req.body')
  res.status(200).json({ errno: 0, msg: '成功' })
}
