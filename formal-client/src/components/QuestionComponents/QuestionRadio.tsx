'use client'

type PropsType = {
  fe_id: string
  props: {
    title: string
    options: Array<{
      value: string
      text: string
    }>
    value: string
    isVertical: boolean
  }
}

export default function QuestionRadio({ fe_id, props }: PropsType) {
  const { title, options = [], value, isVertical } = props

  let liClassName = ''
  if (isVertical) liClassName = 'mb-2.5'
  else liClassName = 'inline-block mr-2.5'

  return (
    <>
      <p>{title}</p>
      <ul className='list-none p-0'>
        {options.map((opt) => {
          const { value: val, text } = opt
          return (
            <li key={val} className={liClassName}>
              <label>
                <input
                  type='radio'
                  name={fe_id}
                  value={val}
                  defaultChecked={val === value}
                />
                {text}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}
