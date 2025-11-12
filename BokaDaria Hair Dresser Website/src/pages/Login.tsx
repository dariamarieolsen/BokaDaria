import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDocumentTitle, setMetaDescription } from "../utils/seo";
import { store } from "../data/store";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setDocumentTitle("Login — BokaDaria");
    setMetaDescription("Sign in to BokaDaria to manage and book appointments.");
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = store.login(username.trim(), password);
    if (!ok) setError("Invalid credentials.");
    else navigate("/booking");
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form className="form" onSubmit={onSubmit} aria-describedby={error ? "login-error" : undefined}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn primary" type="submit">
          Sign in
        </button>
        <div id="login-error" className="error" aria-live="polite">
          {error}
        </div>
      </form>
    </div>
  );
}
