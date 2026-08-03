import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { deleteUser, getUsers } from "../services/api";

const Users = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      getAllUsers();
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="mb-4">
          <h1 className="h3 mb-1">Manage Users</h1>
          <p className="text-muted mb-0">Admin can view, update and delete users.</p>
        </div>

        {message && <div className="alert alert-info">{message}</div>}
        {loading && <Loader />}

        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((item) => String(item.id) !== String(user.id))
                    .map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <th>{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td className="text-capitalize">{item.role}</td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm fw-medium"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {!loading &&
              users.filter((item) => String(item.id) !== String(user.id))
                .length === 0 && (
              <p className="text-muted mb-0">No users found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;