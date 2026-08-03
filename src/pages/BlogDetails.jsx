import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { deleteBlog, getBlog } from "../services/api";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getSingleBlog = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBlog(id);
      setBlog(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteBlog(id);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, [getSingleBlog]);

  const canManage =
    user && (user.role === "admin" || String(user.id) === String(blog.userId));

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        {message && <div className="alert alert-danger">{message}</div>}
        {loading && <Loader />}
        {!loading && blog.id && (
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="card-img-top"
                    style={{ maxHeight: "420px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body p-4">
                  <span className="badge text-bg-light border mb-3">
                    {blog.category}
                  </span>
                  <h1 className="h2">{blog.title}</h1>
                  <p className="text-muted mb-4">
                    By {blog.author} | {blog.date}
                  </p>
                  <p className="lead">{blog.description}</p>
                  {blog.tags && (
                    <p className="mb-4">
                      <strong>Tags:</strong> {blog.tags}
                    </p>
                  )}
                  <div className="d-flex flex-wrap gap-2">
                    <Link to="/" className="btn btn-secondary btn-sm fw-medium">
                      Back
                    </Link>
                    {canManage && (
                      <>
                        <Link
                          to={`/edit/${blog.id}`}
                          className="btn btn-warning btn-sm fw-medium"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm fw-medium"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;