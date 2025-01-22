// import { useEffect } from 'react'

// import ReactHookFormDemo from './ReactHookFormDemo'
import ReactFormikDemo from './ReactFormikDemo'

// import FormElemsDemo from './FormElemsDemo'
// import List1 from './List1'
// import StateDemo1 from './StateDemo1'
// import StateDemo2 from './StateDemo2'
// import List2 from './List2'
// import ImmerDemo from './ImmerDemo'
// import UseRefDemo from './UseRefDemo'
// import UseMemo from "./UseMemo"
// import UseCallbackD emo from './UseCallbackDemo'

// 自定义hooks
// import useTitle from './hooks/useTitle' // 自定义 - 修改网页标题 hook
// import useMouse from './hooks/useMouse' // 自定义 - 获取鼠标位置 hook
// import useGetInfo from './hooks/useGetInfo' // 自定义 - 模拟获取数据 hook

// 第三方hooks
// import { useTitle, useMouse } from 'ahooks'

// 闭包陷阱
// import ClosureTrap from './ClosureTrap'

// CSS 样式
// import StyledComponentsDemo from './StyledComponentsDemo'

export default function App() {
  // useTitle('my-react-app') // 内置 hook - 自定义 hook

  // const { x, y } = useMouse() // 自定义 hook - useMouse()获取鼠标位置 - 当前 APP() 引用了 第三方 hook，所以第三方里面的 state 变化，都会导致当前组件的变化
  // const { loading, info } = useGetInfo() // 自定义 hook - useGetInfo()模拟获取数据

  // 第三方hooks
  // useTitle('react-title')
  // const mouse = useMouse()

  return (
    <>
      <h1>App Page</h1>
      {/* <p>my-react-app</p> */}
      {/* <p>
        X:{x} - Y:{y}
      </p> */}
      {/* <p>{loading ? '加载中...' : info}</p> */}
      {/* <List1 /> */}
      {/* <StateDemo1 /> */}
      {/* <StateDemo2 /> */}
      {/* <List2 /> */}
      {/* <ImmerDemo /> */}
      {/* <UseRefDemo /> */}
      {/* <UseMemo /> */}
      {/* <UseCallbackDemo /> */}

      {/* 第三方hooks */}
      {/* <div>
        <p>
          Client - x:{mouse.clientX}, y: {mouse.clientY}
        </p>
        <p>
          Page - x:{mouse.pageX}, y: {mouse.pageY}
        </p>
        <p>
          Screen - x:{mouse.screenX}, y: {mouse.screenY}
        </p>
      </div> */}

      {/* 闭包陷阱 */}
      {/* <ClosureTrap /> */}

      {/* CSS 样式 */}
      {/* <StyledComponentsDemo /> */}

      {/* <FormElemsDemo /> */}

      {/* 第三方hooks - 表单校验 */}
      {/* <ReactHookFormDemo /> */}
      <ReactFormikDemo />
    </>
  )
}
