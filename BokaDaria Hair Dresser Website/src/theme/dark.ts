import { tokens } from "./tokens";

export const lightTheme = { ...tokens };

export const darkTheme = {
  ...tokens,
  colors: {
    ...tokens.colors,
    background: "#616677ff",
    text: "#e2f12d",
    border: "#1e293b",
    primary: "#616677ff",
    primaryHover: "#1d1e20ff",
    textOnPrimary: "#33ea5eff",
  },
};
