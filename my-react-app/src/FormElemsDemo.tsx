import type { FC } from 'react'
// import { useState } from 'react'

/**
 *
 * @description 表单元素 受控组件演示
 *
 */
const FormElemsDemo: FC = () => {
  // const [text, setText] = useState<string>('hello')
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault()
  //   setText(event.target.value)
  // }

  // 文本域换行处理
  // const genHtml = () => {
  //   return { __html: text.replaceAll('\n', '<br />') }
  // }

  // const handleTextAreaChange = (
  //   event: React.ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   event.preventDefault()
  //   setText(event.target.value)
  // }

  // const [gender, setGender] = useState('male')
  // const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setGender(event.target.value)
  // }

  // const [checked, setChecked] = useState(false)
  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked)
  // }

  // const [checkboxCityList, setCheckboxCityList] = useState<string[]>([])
  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { checked, value } = event.target
  //   if (checked) {
  //     // 添加
  //     setCheckboxCityList(checkboxCityList.concat(value))
  //   } else {
  //     // 移除
  //     setCheckboxCityList(checkboxCityList.filter((item) => item !== value))
  //   }
  // }

  // const [select, setSelect] = useState<string>('js')
  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelect(event.target.value)
  // }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submit')
  }

  return (
    <>
      <p>表单元素</p>
      <div>
        {/* 受控组件 input 示例 */}
        {/* <input value={text} onChange={handleChange} />
        <button onClick={() => console.log(text)}>打印</button> */}

        {/* 受控组件 textarea 示例 */}
        {/* <textarea value={text} onChange={handleTextAreaChange}></textarea>
        <p dangerouslySetInnerHTML={genHtml()}></p> */}

        {/* 受控组件 radio 示例 */}
        {/* <label htmlFor='radio1'>男</label>
        <input
          type='radio'
          id='radio1'
          name='gender'
          value='male'
          checked={gender === 'male'}
          onChange={handleRadioChange}
        />
        <label htmlFor='radio2'>女</label>
        <input
          type='radio'
          id='radio2'
          name='gender'
          value='female'
          checked={gender === 'female'}
          onChange={handleRadioChange}
        />
        <button onClick={() => console.log(gender)}>打印</button> */}

        {/* 受控组件 checkbox 示例 */}
        {/* <label htmlFor='checkbox1'>选中</label>
        <input
          type='checkbox'
          id='checkbox1'
          name='checkbox'
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <p>{checked.toString()}</p> */}

        {/* 受控组件 checkbox 示例 2 */}
        {/* <label htmlFor='checkbox1'>北京</label>
        <input
          type='checkbox'
          id='checkbox1'
          name='checkbox'
          value='beijing'
          checked={checkboxCityList.includes('beijing')}
          onChange={handleCheckboxChange}
        />
        <label htmlFor='checkbox2'>上海</label>
        <input
          type='checkbox'
          id='checkbox2'
          name='checkbox'
          value='shanghai'
          checked={checkboxCityList.includes('shanghai')}
          onChange={handleCheckboxChange}
        />
        <label htmlFor='checkbox3'>深圳</label>
        <input
          type='checkbox'
          id='checkbox3'
          name='checkbox'
          value='shenzhen'
          checked={checkboxCityList.includes('shenzhen')}
          onChange={handleCheckboxChange}
        />
        <button onClick={() => console.log(checkboxCityList)}>打印</button> */}

        {/* 受控组件 select 示例 */}
        {/* <select value={select} onChange={handleSelectChange}>
          <option value='js'>JavaScript</option>
          <option value='react'>react</option>
          <option value='vue'>vue</option>
        </select>
        <p>{JSON.stringify(select)}</p> */}

        {/* form 组件示例 form提交一定要有 name、value */}
        <form onSubmit={handleSubmit}>
          <input type='hidden' name='token' defaultValue='token' />
          <input type='text' id='username' name='username' defaultValue='username' />
          <br />
          <textarea id='content' name='content' defaultValue='content' />
          <br />
          <button type='submit'>提交</button>
        </form>
      </div>
    </>
  )
}

export default FormElemsDemo
