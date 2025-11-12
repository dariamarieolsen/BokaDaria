import { NavLink } from "react-router-dom";
import { useTheme } from "../theme/provider";

export default function Header() {
  const { mode, toggle } = useTheme();
  return (
    <header role="banner">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" aria-label="BokaDaria home" style={{ color: "inherit", textDecoration: "none", fontWeight: 800 }}>
          BokaDaria
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <nav aria-label="Primary" className="nav">
            <NavLink to="/" end>
              {({ isActive }: { isActive: boolean }) => <span aria-current={isActive ? "page" : undefined}>Home</span>}
            </NavLink>
            <NavLink to="/login">{({ isActive }: { isActive: boolean }) => <span aria-current={isActive ? "page" : undefined}>Login</span>}</NavLink>
          </nav>
          <button className="btn ghost" aria-pressed={mode === "dark"} aria-label="Toggle dark mode" onClick={toggle}>
            {mode === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>
    </header>
  );
}
