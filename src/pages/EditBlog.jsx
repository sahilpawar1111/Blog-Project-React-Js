import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { getBlog, updateBlog } from "../services/api";

const EditBlog = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const getSingleBlog = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBlog(id);
      if (user.role !== "admin" && String(user.id) !== String(data.userId)) {
        navigate("/");
        return;
      }
      setBlog(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [id, navigate, user.id, user.role]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateBlog(id, blog);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, [getSingleBlog]);

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h1 className="h3 mb-1">Edit Blog</h1>
                <p className="text-muted mb-4">Update your post details.</p>
                {message && <div className="alert alert-danger">{message}</div>}
                {loading && <Loader />}
                {!loading && (
                  <form method="post" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={blog.title || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={blog.description || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={blog.category || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  name="author"
                  value={blog.author || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="imageUrl"
                  name="imageUrl"
                  value={blog.imageUrl || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tags" className="form-label">
                  Tags
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  name="tags"
                  value={blog.tags || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={blog.date || ""}
                  onChange={handleChange}
                  required
                />
              </div>
                    <button type="submit" className="btn btn-primary fw-medium">
                      Update
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;