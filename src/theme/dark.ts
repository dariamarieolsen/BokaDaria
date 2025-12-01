import { tokens } from "./tokens";

export const lightTheme = { ...tokens };

export const darkTheme = {
  ...tokens,
  colors: {
    ...tokens.colors,
    primary: "#616677ff",
    primaryHover: "black",
    textOnPrimary: "#33ea5eff",

    secondary: "#e2f12d",
    secondaryHover: "#c9d426",
    textOnSecondary: "#3c3f42ff",

    border: "#33ea5eff",
    background: "#616677ff",
    text: "#e2f12d",
  },
};
