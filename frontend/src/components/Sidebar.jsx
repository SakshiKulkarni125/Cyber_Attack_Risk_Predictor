import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  History as HistoryIcon,
  ShieldAlert,
  UserCircle,
  LogOut,
  Activity,
} from "lucide-react";
export default function Sidebar() {
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem("auth");
    nav("/login");
  };
  const links = [
    ["/", "Dashboard", LayoutDashboard],
    ["/prediction", "New Prediction", Search],
    ["/history", "Prediction History", HistoryIcon],
    ["/attacks", "Attack Information", ShieldAlert],
    ["/profile", "Profile", UserCircle],
  ];
  return (
    <aside className="sidebar">
      <div className="brand">
        <Activity />{" "}
        <span>
          Net<span>Guard</span>
        </span>
      </div>
      <div className="brand-sub">Network Attack Detection</div>
      <nav>
        {links.map(([to, label, Icon]) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
          >
            <Icon size={19} />
            {label}
          </NavLink>
        ))}
      </nav>
      <button className="logout" onClick={logout}>
        <LogOut size={19} />
        Logout
      </button>
    </aside>
  );
}
