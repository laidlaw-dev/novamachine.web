interface IColorSwatch {
  readonly 50: string
  readonly 100: string
  readonly 200: string
  readonly 300: string
  readonly 400: string
  readonly 500: string
  readonly 600: string
  readonly 700: string
  readonly 800: string
  readonly 900: string
}

interface IColors {
  readonly primary: IColorSwatch
  readonly secondary: IColorSwatch
  readonly error: IColorSwatch
  readonly warning: IColorSwatch
  readonly info: IColorSwatch
  readonly success: IColorSwatch
  readonly background: IColorSwatch
  readonly container: IColorSwatch
}

export const colors: IColors = {
  primary: {
    50: "#fcf9f9",
    100: "#f5eceb",
    200: "#e6d0cd",
    300: "#d6b5b1",
    400: "#c69a96",
    500: "#b47d78",
    600: "#a0605a",
    700: "#914b46",
    800: "#733d38",
    900: "#542e2a",
  },
  secondary: {
    50: "#f9fafb",
    100: "#eaeef3",
    200: "#ccd6e1",
    300: "#afbfd0",
    400: "#91a7bf",
    500: "#6f8eac",
    600: "#4b7599",
    700: "#2d648c",
    800: "#27506f",
    900: "#203a50",
  },
  error: {
    50: "#fff9f7",
    100: "#fde9e5",
    200: "#f8cac1",
    300: "#f1ac9f",
    400: "#e78d7c",
    500: "#d96a58",
    600: "#c84234",
    700: "#bb1d1b",
    800: "#951c17",
    900: "#6b1a14",
  },
  warning: {
    50: "#fff9f3",
    100: "#feebd8",
    200: "#f7cda0",
    300: "#edb26a",
    400: "#de962f",
    500: "#bd7d1e",
    600: "#9a661d",
    700: "#81561b",
    800: "#674518",
    900: "#4b3315",
  },
  success: {
    50: "#f6fcf3",
    100: "#dff4d8",
    200: "#afe2a0",
    300: "#78d16a",
    400: "#33be2a",
    500: "#1fa11b",
    600: "#21821b",
    700: "#216e1a",
    800: "#1f5818",
    900: "#1b4015",
  },
  info: {
    50: "#fbf9fe",
    100: "#f1ebfa",
    200: "#dccff3",
    300: "#c7b4eb",
    400: "#b199e3",
    500: "#977bda",
    600: "#7a5dd0",
    700: "#6348c9",
    800: "#4530c1",
    900: "#1d19ac",
  },
  background: {
    50: "#fafafa",
    100: "#eeeeee",
    200: "#d5d5d5",
    300: "#bdbdbd",
    400: "#a5a5a5",
    500: "#8b8b8b",
    600: "#717171",
    700: "#5f5f5f",
    800: "#4c4c4c",
    900: "#383838",
  },
  container: {
    50: "#fbfaf5",
    100: "#f2eede",
    200: "#dad5c1",
    300: "#c2bdab",
    400: "#a9a596",
    500: "#8e8b7e",
    600: "#747167",
    700: "#625f57",
    800: "#4e4c46",
    900: "#393834",
  },
}

interface IExtendedPalette {
  readonly containerFocus: string
}

export const extendedPalette: IExtendedPalette = {
  containerFocus: colors.container[500],
}
