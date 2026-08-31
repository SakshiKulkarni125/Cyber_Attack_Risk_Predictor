import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Eye, EyeOff } from "lucide-react";
export default function Login() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    localStorage.setItem("auth", "1");
    localStorage.setItem("username", form.email.split("@")[0] || "User");
    nav("/");
  };
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your network security dashboard"
    >
      <form onSubmit={submit}>
        <label>Email / Username</label>
        <input
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
        />
        <label>Password</label>
        <div className="password">
          <input
            required
            type={show ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter password"
          />
          <button type="button" onClick={() => setShow(!show)}>
            {show ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <div className="forgot">
          <a href="#">Forgot password?</a>
        </div>
        <button className="primary full">Login</button>
        <p className="auth-foot">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </AuthShell>
  );
}
export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <Activity /> NetGuard
        </div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
