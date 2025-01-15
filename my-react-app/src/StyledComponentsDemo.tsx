import { FC } from 'react'
import styled from 'styled-components'
const StyledComponentsDemo: FC = () => {
  const Button = styled.button`
    color: #bf4f74;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #bf4f74;
    border-radius: 3px;
  `

  const TomatoButton = styled(Button)`
    color: tomato;
    border-color: tomato;
  `

  return (
    <div>
      <p>styled-components</p>
      <TomatoButton>Tomato Button</TomatoButton>
    </div>
  )
}

export default StyledComponentsDemo
