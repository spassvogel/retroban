import { ComponentProps } from "react"

type Props = ComponentProps<'button'>

const Button = ({ children, ...restProps }: Props) => {
  return (
    <button { ...restProps} className="button">
      {children}
    </button>
  )
}

export default Button
