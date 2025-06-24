import IconButton, { type IconButtonProps } from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

const IconActionButton = (props: IconButtonProps) => {
  const { title, disabled, ...rest } = props

  if (title != null && !disabled) {
    return (
      <Tooltip title={title}>
        <IconButton color="secondary" size="small" {...rest}>
          {props.children}
        </IconButton>
      </Tooltip>
    )
  }
  return (
    <IconButton color="secondary" size="small" disabled={disabled} {...rest}>
      {props.children}
    </IconButton>
  )
}

export default IconActionButton
