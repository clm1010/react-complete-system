import type { FC } from 'react'

import { useForm } from 'react-hook-form'

const ReactHookForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = (data: any) => console.log(data)

  return (
    <div>
      <h2>ReactHookForm</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='InputFirstName'>First Name</label>
          <input
            id='InputFirstName'
            {...register('firstName', {
              required: true,
              minLength: 3,
              maxLength: 20
            })}
          />
          {errors.firstName && (
            <span style={{ color: 'red' }}>FirstName请输入3-20位字符</span>
          )}
          <br />
          <label htmlFor='InputLastName'>Last Name</label>
          <input
            id='InputLastName'
            {...register('lastName', {
              required: true,
              pattern: /^[A-Za-z]+$/i
            })}
          />
          {errors.lastName && (
            <span style={{ color: 'red' }}>LastName 请输入字母</span>
          )}
          <br />
          <label htmlFor='InputAge'>Aget</label>
          <input
            id='InputAge'
            {...register('age', {
              required: true,
              min: 18,
              max: 80
            })}
          />
          {errors.age && <span style={{ color: 'red' }}>Age必须18-80岁</span>}
          <br />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ReactHookForm
