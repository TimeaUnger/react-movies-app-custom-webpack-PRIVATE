import * as React from 'react'

type Props = {
  text: string;
  color: string;
}

export const Test: React.FC<Props> = ({text, color}) => {
  return <h1 style={{ color }}>{text}</h1>
}

Test.defaultProps = {
  color: 'red',
  text: 'Hello world!'
} 