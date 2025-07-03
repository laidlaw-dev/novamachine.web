import Alert, { type AlertColor } from "@mui/material/Alert"
import { durations } from "../../../theme/durations"
import Snackbar from "@mui/material/Snackbar"

interface SnackbarMessageProps {
  message: string
  severity: AlertColor
  open: boolean
  onClose: () => void
}

const SnackbarMessage = ({
  message,
  severity,
  open,
  onClose,
}: SnackbarMessageProps) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={durations.snackbar}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarMessage
