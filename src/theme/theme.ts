import { createTheme } from "@mui/material/styles"
import { colors } from "./colors"

declare module "@mui/material/styles" {
  interface TypographyVariants {
    mono: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    mono?: React.CSSProperties
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    mono: true
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[700],
    },
    secondary: {
      main: colors.secondary[700],
    },
    error: {
      main: colors.error[700],
    },
    warning: {
      main: colors.warning[700],
    },
    success: {
      main: colors.success[700],
    },
    info: {
      main: colors.info[700],
    },
    text: {
      primary: "#2d2d2d",
      secondary: "#77736b",
    },
    background: {
      default: colors.neutral[100],
      paper: colors.container[100],
    },
  },
  typography: {
    fontFamily: "Barlow Condensed",
    h1: {
      fontFamily: "Bebas Neue",
    },
    h2: {
      fontFamily: "Bebas Neue",
    },
    h3: {
      fontFamily: "Bebas Neue",
    },
    h4: {
      fontFamily: "Bebas Neue",
    },
    h5: {
      fontFamily: "Bebas Neue",
    },
    h6: {
      fontFamily: "Bebas Neue",
    },
    mono: {
      fontFamily: "Cousine",
      fontWeight: 400,
      fontSize: "1rem",
    },
  },
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
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.neutral[100],
        },
      },
    },
  },
})
