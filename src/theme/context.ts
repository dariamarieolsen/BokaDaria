import { createContext } from "react";

export type ThemeContextValue = {
  mode: "light" | "dark";
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
