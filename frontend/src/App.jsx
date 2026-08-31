import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Result from "./pages/Result";
import History from "./pages/History";
import Attacks from "./pages/Attacks";
import Profile from "./pages/Profile";

function Protected({ children }) {
  const auth = localStorage.getItem("auth");
  return auth ? children : <Navigate to="/login" replace />;
}
function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  );
}
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <Protected>
            <Layout>
              <Dashboard />
            </Layout>
          </Protected>
        }
      />
      <Route
        path="/prediction"
        element={
          <Protected>
            <Layout>
              <Prediction />
            </Layout>
          </Protected>
        }
      />
      <Route
        path="/result"
        element={
          <Protected>
            <Layout>
              <Result />
            </Layout>
          </Protected>
        }
      />
      <Route
        path="/history"
        element={
          <Protected>
            <Layout>
              <History />
            </Layout>
          </Protected>
        }
      />
      <Route
        path="/attacks"
        element={
          <Protected>
            <Layout>
              <Attacks />
            </Layout>
          </Protected>
        }
      />
      <Route
        path="/profile"
        element={
          <Protected>
            <Layout>
              <Profile />
            </Layout>
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
