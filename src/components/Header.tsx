import { NavLink } from "react-router-dom";
import { useTheme } from "../theme/provider";
import "../styles/header.css";
import Hamburger from "./Hamburger";

export default function Header() {
  const { mode, toggle } = useTheme();


  return (
    <header className="header" role="header">
      <div className="header-container">
        <a href="/" aria-label="BokaDaria home" className="header-logo">
          BokaDaria
        </a>
        <div className="header-actions">
          <nav aria-label="Primary" className="nav">
            <NavLink to="/" end>
              {({ isActive }: { isActive: boolean }) => <span aria-current={isActive ? "page" : undefined}>Home</span>}
            </NavLink>
            <NavLink to="/login">
              {({ isActive }: { isActive: boolean }) => <span aria-current={isActive ? "page" : undefined}>Login</span>}
            </NavLink>
          </nav>
          <button
            className="btn ghost theme-toggle"
            aria-pressed={mode === "dark"}
            aria-label="Toggle dark mode"
            onClick={toggle}
          >
            {mode === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <Hamburger />
        </div>
      </div>
    </header>
  );
}
