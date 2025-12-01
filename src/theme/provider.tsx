import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { darkTheme, lightTheme } from "./dark";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  toggle: () => void;
};

//creating context, default value is null
const ThemeContext = createContext<ThemeContextValue | null>(null);

//gets initial mode from localStorage or system preference
function getInitialMode(): ThemeMode {
  const saved = typeof localStorage !== "undefined" ? localStorage.getItem("theme-mode") : null;
  if (saved === "light" || saved === "dark") return saved;
  //browsers/device darkmode preference
  const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

//wraps my whole app
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    try {
      localStorage.setItem("theme-mode", mode);
    } catch { }
  }, [mode]);

  //setting css variables on :root on first render
  useEffect(() => {
    const theme = mode === "dark" ? darkTheme : lightTheme;
    const root = document.documentElement;
    const {
      colors,
      radius = { sm: "4px", md: "8px", lg: "12px" },
      spacing = { sm: "8px", md: "12px", lg: "16px" },
      font = { family: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif", weight: 400 },
    } = theme as any;
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-primary-hover", colors.primaryHover);
    root.style.setProperty("--color-on-primary", colors.textOnPrimary);

    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-secondary-hover", colors.secondaryHover);
    root.style.setProperty("--color-on-secondary", colors.textOnSecondary);

    root.style.setProperty("--color-border", colors.border);
    root.style.setProperty("--color-bg", colors.background);
    root.style.setProperty("--color-text", colors.text);
    root.style.setProperty("--color-disabled-button", colors.disabled);
    root.style.setProperty("--color-disabled-button-text", colors.disabledText);

    root.style.setProperty("--radius-sm", radius.sm);
    root.style.setProperty("--radius-md", radius.md);
    root.style.setProperty("--radius-lg", radius.lg);

    root.style.setProperty("--space-sm", spacing.sm);
    root.style.setProperty("--space-md", spacing.md);
    root.style.setProperty("--space-lg", spacing.lg);

    root.style.setProperty("--font-family", String(font.family));
    root.style.setProperty("--font-weight", String(font.weight ?? 400));

    document.body.style.background = colors.background;
    document.body.style.color = colors.text;
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));
  const value = useMemo(() => ({ mode, toggle }), [mode]);

  //AppThemeProvider is wrapping the whole app inside main.tsx, making it avalible to all its children
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

//use this hook in every component where I want to access the theme mode or toggle function
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within AppThemeProvider");
  return ctx;
}

export default AppThemeProvider;
