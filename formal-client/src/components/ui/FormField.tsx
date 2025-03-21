// src/components/ui/FormField.tsx
'use client'

import { ComponentProps, ReactNode } from 'react'

/**
 * 表单字段组件 Props 类型
 */
type FormFieldProps<T extends React.ElementType> = {
  /** 字段标签文本 */
  label: string
  /** 错误提示信息 */
  error?: string
  /** 是否必填标记 */
  required?: boolean
  /** 自定义渲染输入元素 */
  render?: (props: ComponentProps<'input'>) => ReactNode
  /** 作为指定 HTML 元素类型 */
  as?: T
  /** 下拉选项（当 as="select" 时使用） */
  options?: Array<{ value: string; label: string }>
} & ComponentProps<T>

/**
 * 通用表单字段组件
 * 支持输入框、下拉选择、文本域等多种类型
 */
export function FormField<T extends React.ElementType = 'input'>({
  label,
  error,
  required = false,
  render,
  as: Component = 'input',
  options,
  ...props
}: FormFieldProps<T>) {
  // 生成通用输入属性
  const inputProps = {
    ...props,
    id: props.id || props.name,
    'aria-required': required,
    className: `w-full p-2 border rounded ${
      error ? 'border-red-500' : 'border-gray-300'
    } ${props.className || ''}`
  }

  return (
    <div className='space-y-2'>
      {/* 标签区域 */}
      <label
        htmlFor={inputProps.id}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>

      {/* 输入内容区域 */}
      <div>
        {render ? (
          // 自定义渲染模式
          render(inputProps as ComponentProps<'input'>)
        ) : Component === 'select' ? (
          // 下拉选择框
          <select {...inputProps}>
            <option value=''>请选择...</option>

            {options?.map(
              // eslint-disable-next-line
              (opt: any) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              )
            )}
          </select>
        ) : Component === 'textarea' ? (
          // 多行文本域
          <textarea {...inputProps} rows={4} />
        ) : (
          // 默认输入框
          <Component {...inputProps} />
        )}
      </div>

      {/* 错误提示 */}
      {error && (
        <p className='text-red-500 text-sm mt-1' role='alert'>
          {error}
        </p>
      )}
    </div>
  )
}
