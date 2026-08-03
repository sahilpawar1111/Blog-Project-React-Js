import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, getUsers } from "../services/api";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const users = await getUsers();
      const emailExists = users.some((item) => item.email === user.email);

      if (emailExists) {
        setMessage("Email already exists");
        return;
      }

      await createUser(user);
      navigate("/login");
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
                <h1 className="h3 mb-1">Register</h1>
                <p className="text-muted mb-4">Create your account.</p>
                {message && <p>{message}</p>}
                <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                placeholder="e.g., name@example.com"
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
                value={user.password}
                onChange={handleChange}
                required
                placeholder="At least 6 characters"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                id="role"
                name="role"
                value={user.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
                  <button
                    type="submit"
                    className="btn btn-primary fw-medium me-2"
                  >
                    Register
                  </button>
                  <Link to="/login" className="btn btn-link fw-medium">
                    Login
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

export default Register;