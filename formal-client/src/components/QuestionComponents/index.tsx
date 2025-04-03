'use client'
import type { ComponentInfoType } from '@/types/question.d.ts'

import QuestionTitle from './QuestionTitle'
import QuestionInput from './QuestionInput'
import QuestionRadio from './QuestionRadio'

export const getComponent = (comp: ComponentInfoType) => {
  const { fe_id, type, isHidden, props = {} } = comp

  if (isHidden) return null

  console.log(type, 'type')
  console.log(comp, 'comp')
  // switch (type) {
  //   case 'questionTitle':
  //     return <QuestionTitle {...props} />
  //   case 'questionInput':
  //     return <QuestionInput fe_id={fe_id} props={props} />
  //   case 'questionRadio':
  //     return <QuestionRadio fe_id={fe_id} props={props} />
  //   default:
  //     return null
  // }
  if (type === 'questionTitle') {
    return <QuestionTitle {...props} />
  }
  if (type === 'questionInput') {
    return <QuestionInput fe_id={fe_id} props={props} />
  }

  if (type === 'questionRadio') {
    return <QuestionRadio fe_id={fe_id} props={props} />
  }

  return null
}
