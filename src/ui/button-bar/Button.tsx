import { ComponentProps } from "react"

type Props = ComponentProps<'button'>

const Button = ({ children, className, ...restProps }: Props) => {
  return (
    <button { ...restProps} className={`button ${className ?? ""}`}>
      {children}
    </button>
  )
}

export default Button
