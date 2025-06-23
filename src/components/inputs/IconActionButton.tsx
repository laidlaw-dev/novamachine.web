import IconButton, { type IconButtonProps } from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

const IconActionButton = (props: IconButtonProps) => {
  const { title, ...rest } = props

  if (title != null) {
    return (
      <Tooltip title={title}>
        <IconButton color="secondary" size="small" {...rest}>
          {props.children}
        </IconButton>
      </Tooltip>
    )
  }
  return (
    <IconButton color="secondary" size="small" {...rest}>
      {props.children}
    </IconButton>
  )
}

export default IconActionButton
