'use server'
// import type { NextApiRequest, NextApiResponse } from 'next'

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'post') {
//     // 不是 POST 请求, 则返回错误信息！
//     res.status(200).json({ errno: -1, msg: 'Method 错误！' })
//   }
//   console.log(req.body, 'req.body')

//   res.status(200).json({ errno: 0, msg: '提交成功！' })
// }

// import { NextResponse } from 'next/server'

// const data = ['123', '456', '789']

// export async function GET() {
//   return NextResponse.json({ errno: 0, data })
// }

// export async function POST(req: Request) {
//   const formData = await req.formData()
//   const answer = formData.get('answer') as string
//   data.push(answer)
//   return NextResponse.json({errno: 0, data })
// }
