import type { FC } from 'react'
import styled, { css } from 'styled-components'

// 定义 Button 的类型
type ButtonPropsType = {
  primary?: boolean
}

// Button 组件
const Button = styled.button<ButtonPropsType>`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  ${(props: ButtonPropsType) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `}
`
// Container 组件
const Container = styled.div`
  text-align: center;
`

const StyledComponentsDemo: FC = () => {
  return (
    <div>
      <p>styled-components</p>
      <Container>
        <Button>Normal Button</Button>
        <Button primary>primary Button</Button>
      </Container>
    </div>
  )
}

export default StyledComponentsDemo
