import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, isAdminLoggedIn, setAuthToken } from "../utils/api";
import "../styles/Admin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn()) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please check credentials.");
      }

      if (typeof data.token !== "string" || !data.token) {
        throw new Error("Login did not return a valid session token.");
      }

      setAuthToken(data.token);
      navigate("/admin");
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-panel">
        <h1>Admin Login</h1>
        <p>Securely sign in to manage courses, faculty, notices, gallery, and admissions.</p>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="admin@college.edu"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="Enter your password"
            />
          </label>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Signing in…" : "Sign In"}</button>
        </form>
      </section>
    </main>
  );
}

export default AdminLogin;