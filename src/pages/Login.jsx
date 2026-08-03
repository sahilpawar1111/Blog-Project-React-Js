import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUsers } from "../services/api";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const users = await getUsers();
      const user = users.find(
        (item) =>
          item.email === userData.email && item.password === userData.password
      );

      if (!user) {
        setMessage("Invalid email or password");
        return;
      }

      login(user);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h1 className="h3 mb-1">Login</h1>
                <p className="text-muted mb-4">Welcome back to Blog App.</p>
                {message && <p>{message}</p>}
                <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
                placeholder="Enter register email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
                placeholder="Enter register password"
              />
            </div>
                  <button
                    type="submit"
                    className="btn btn-primary fw-medium me-2"
                  >
                    Login
                  </button>
                  <Link to="/register" className="btn btn-link fw-medium">
                    Register
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;