import type { FC } from 'react'
import { createContext, useState } from 'react'
import ToolBar from './Toolbar'

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
}

// 定义 ThemeContext 主题，创建一个 Context 对象
export const ThemeContext = createContext(themes.light)

const ContextDemo: FC = () => {
  const [theme, setTheme] = useState(themes.light)
  const toDark = () => {
    setTheme(themes.dark)
  }
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <span>Context Demo</span>
        <button onClick={toDark}>dark</button>
      </div>
      <ToolBar />
    </ThemeContext.Provider>
  )
}

export default ContextDemo
