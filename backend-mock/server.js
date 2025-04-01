// backend/server.js
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.BACKEND_PORT || 3001 // 后端端口，可以配置

// --- 中间件 ---
// 允许来自特定源的跨域请求 (在生产环境中应更严格地配置)
// 从环境变量读取前端 URL
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
app.use(
  cors({
    origin: frontendUrl // 允许来自 Next.js 前端的请求
  })
)
app.use(express.json()) // 解析 JSON 请求体

// --- 简单内存数据库 ---
// 在实际应用中，这里应该连接真实的数据库 (如 MongoDB, PostgreSQL)
let questionnaires = [
  { id: '1', title: 'Initial Sample', content: 'This is loaded from backend.' }
]
let nextId = 2 // 用于生成新的 ID

// --- API 路由 ---

// GET /api/questionnaires - 获取所有问卷
app.get('/api/questionnaires', (req, res) => {
  console.log('GET /api/questionnaires')
  res.status(200).json(questionnaires)
})

// POST /api/questionnaires - 创建新问卷
app.post('/api/questionnaires', (req, res) => {
  console.log('POST /api/questionnaires', req.body)
  const { title, content } = req.body

  // 基本验证
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and Content are required' })
  }

  const newQuestionnaire = {
    id: String(nextId++), // 生成新 ID
    title,
    content
  }
  questionnaires.push(newQuestionnaire)
  console.log('Added:', newQuestionnaire)
  res.status(201).json(newQuestionnaire) // 返回创建的资源和 201 状态码
})

// GET /api/questionnaires/:id - 获取单个问卷
app.get('/api/questionnaires/:id', (req, res) => {
  const { id } = req.params
  console.log(`GET /api/questionnaires/${id}`)
  const questionnaire = questionnaires.find((q) => q.id === id)
  if (questionnaire) {
    res.status(200).json(questionnaire)
  } else {
    res.status(404).json({ message: 'Questionnaire not found' })
  }
})

// PUT /api/questionnaires/:id - 更新单个问卷
app.put('/api/questionnaires/:id', (req, res) => {
  const { id } = req.params
  const { title, content } = req.body
  console.log(`PUT /api/questionnaires/${id}`, req.body)

  const index = questionnaires.findIndex((q) => q.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Questionnaire not found' })
  }

  // 只更新提供的字段
  if (title !== undefined) {
    questionnaires[index].title = title
  }
  if (content !== undefined) {
    questionnaires[index].content = content
  }

  console.log('Updated:', questionnaires[index])
  res.status(200).json(questionnaires[index]) // 返回更新后的资源
})

// DELETE /api/questionnaires/:id - 删除单个问卷 (可选)
app.delete('/api/questionnaires/:id', (req, res) => {
  const { id } = req.params
  console.log(`DELETE /api/questionnaires/${id}`)
  const initialLength = questionnaires.length
  questionnaires = questionnaires.filter((q) => q.id !== id)

  if (questionnaires.length < initialLength) {
    res.status(204).send() // 成功删除，无内容返回
  } else {
    res.status(404).json({ message: 'Questionnaire not found' })
  }
})

// --- 启动服务器 ---
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`)
  console.log(`Allowing requests from: ${frontendUrl}`)
})
