import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { deleteBlog, getBlogs } from "../services/api";

const formatDate = (date) => {
  if (!date) {
    return "No date";
  }

  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

const Dashboard = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getAllBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      const dashboardBlogs =
        user.role === "admin"
          ? data
          : data.filter((blog) => String(blog.userId) === String(user.id));
      setBlogs(dashboardBlogs);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [user.id, user.role]);

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      getAllBlogs();
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, [getAllBlogs]);

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="mb-4">
          <div className="text-center">
            <h1 className="h3 mb-1">Dashboard</h1>
            <p className="text-muted mb-0">Manage your blog posts here.</p>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <p className="text-muted mb-1">Total Blogs</p>
                <h3 className="mb-0">{blogs.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <p className="text-muted mb-1">Role</p>
                <h3 className="text-capitalize mb-0">{user.role}</h3>
              </div>
            </div>
          </div>
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
                    <th>Title</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Tags</th>
                    <th>Image</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog, index) => (
                    <tr key={blog.id}>
                      <th>{index + 1}</th>
                      <td>{blog.title}</td>
                      <td>{blog.category}</td>
                      <td>{blog.author}</td>
                      <td>{formatDate(blog.date)}</td>
                      <td>{blog.tags || "No tags"}</td>
                      <td>
                        {blog.imageUrl ? (
                          <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="rounded border"
                            style={{
                              width: "70px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          "No image"
                        )}
                      </td>
                      <td className="text-end">
                        <Link
                          to={`/edit/${blog.id}`}
                          className="btn btn-warning btn-sm me-2 fw-medium"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm fw-medium"
                          onClick={() => handleDelete(blog.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!loading && blogs.length === 0 && (
              <p className="text-muted mb-0">No blogs found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;