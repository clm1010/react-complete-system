/**
 * 通用按钮组件
 * 封装基础按钮样式和状态
 */

import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary'
}

export const Button = ({
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) => {
  const baseStyle = 'px-4 py-2 rounded transition-colors duration-200'
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  }

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
