import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
      defaultProps: {
        disableElevation: true,
        color: "primary",
        variant: "contained",
        size: "small",
      },
    },
  },
})
