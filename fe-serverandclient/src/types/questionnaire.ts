// app/types/questionnaire.ts

/**
 * 定义问卷数据结构
 */
export interface Questionnaire {
  id: string
  title: string
  content: string
}

/**
 * 定义创建问卷时可能需要的数据结构 (可能没有 id)
 */
export type QuestionnaireCreateData = Omit<Questionnaire, 'id'>

/**
 * 定义更新问卷时可能需要的数据结构 (所有字段可选)
 */
export type QuestionnaireUpdateData = Partial<QuestionnaireCreateData>
