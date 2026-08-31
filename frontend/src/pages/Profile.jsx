import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Lock } from "lucide-react";
export default function Profile() {
  const nav = useNavigate();
  const [name, setName] = useState(localStorage.getItem("username") || "User");
  const [email, setEmail] = useState(localStorage.getItem("email") || "User");
  const save = (e) => {
    e.preventDefault();
    localStorage.setItem("username", name);
    alert("Profile updated");
  };
  return (
    <>
      <header className="top">
        <div>
          <p className="eyebrow">Account</p>
          <h1>Hello, {name}</h1>
          <p className="muted">Manage your account information.</p>
        </div>
      </header>
      <div className="profile-grid">
        <section className="panel profile-card">
          <UserCircle size={52} />
          <h2>{name}</h2>
          <p className="muted">Network security analyst</p>
          <div className="profile-info">
            <span>Name</span>
            <b>{name}</b>
            <span>Email</span>
            <b>{email}</b>
            <span>Username</span>
            <b>{name.toLowerCase().replaceAll(" ", "")}</b>
          </div>
        </section>
        <section className="panel">
          <h2>Account Settings</h2>
          <form onSubmit={save} className="settings-form">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label>Email</label>
            <input value={email} disabled />
            <button className="primary">Save Changes</button>
          </form>
          <div className="divider" />
          <h3>
            <Lock size={18} /> Change password
          </h3>
          <div className="password-grid">
            <input type="password" placeholder="Current password" />
            <input type="password" placeholder="New password" />
          </div>
          <button className="secondary">Update Password</button>
        </section>
      </div>
    </>
  );
}
