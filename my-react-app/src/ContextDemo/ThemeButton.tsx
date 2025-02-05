import type { FC } from 'react'
import { useContext } from 'react'
import { ThemeContext } from './index'

const ThemeButton: FC = () => {
  const theme = useContext(ThemeContext)
  // 根据 theme 设置 button 的样式
  const style = {
    background: theme.background,
    color: theme.foreground
  }

  return <button style={style}>ThemeButton</button>
}

export default ThemeButton
