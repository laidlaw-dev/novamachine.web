import Button, { type ButtonProps } from "@mui/material/Button"

const DialogActionButton = (props: ButtonProps) => {
  return (
    <Button variant="text" color="primary" size="large" {...props}>
      {props.children}
    </Button>
  )
}

export default DialogActionButton
