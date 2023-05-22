import * as React from 'react'
import './Button.scss'

type ButtonTypes = 'button' | 'submit' | 'reset';

interface Props {
  type: ButtonTypes,
  label: string
  onClick?: () => void;
  className?: string;
}

const Button = ({ type, className, onClick, label, ...restProps }: Props) => {

  return (
    <button className={className} onClick={onClick} {...restProps}>
      {label}
    </button>
  );
};

export default Button;
