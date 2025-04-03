'use client'

interface QuestionInputPropsType {
  fe_id: string
  props: {
    title: string
    placeholder?: string
  }
}

export default function QuestionInput({
  fe_id,
  props
}: QuestionInputPropsType) {
  const { title, placeholder = '' } = props
  return (
    <>
      <p>{title}</p>
      <div className='w-full mb-4 pt-0 pb-0 pl-1.5 pr-1.5'>
        <input
          className='w-full border-solid border-2 rounded-md border-gray-200 hover:border-purple-400 focus:border-purple-200 focus:outline-none dark:border-purple-800'
          type='text'
          name={fe_id}
          placeholder={placeholder}
        />
      </div>
    </>
  )
}
