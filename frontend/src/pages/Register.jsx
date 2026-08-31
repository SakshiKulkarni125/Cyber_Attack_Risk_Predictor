import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthShell } from "./Login";
export default function Register() {
  const nav = useNavigate();
  const [f, setF] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const submit = (e) => {
    e.preventDefault();
    if (f.password !== f.confirm) return alert("Passwords do not match");
    localStorage.setItem("username", f.name);
    localStorage.setItem("email", f.email);
    localStorage.setItem("auth", "1");
    nav("/");
  };
  const c = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <AuthShell
      title="Create account"
      subtitle="Start monitoring network traffic"
    >
      <form onSubmit={submit}>
        <label>Full Name</label>
        <input
          required
          value={f.name}
          onChange={c("name")}
          placeholder="Your full name"
        />
        <label>Email</label>
        <input
          required
          type="email"
          value={f.email}
          onChange={c("email")}
          placeholder="you@example.com"
        />
        <label>Password</label>
        <input
          required
          type="password"
          value={f.password}
          onChange={c("password")}
          placeholder="Create password"
        />
        <label>Confirm Password</label>
        <input
          required
          type="password"
          value={f.confirm}
          onChange={c("confirm")}
          placeholder="Confirm password"
        />
        <button className="primary full">Create Account</button>
        <p className="auth-foot">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </AuthShell>
  );
}
