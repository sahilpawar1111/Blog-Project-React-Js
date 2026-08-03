import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createBlog } from "../services/api";

const CreateBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    category: "",
    author: user?.name || "",
    imageUrl: "",
    tags: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBlog({ ...blog, userId: user.id });
      setMessage("Blog created successfully");
      setBlog({
        title: "",
        description: "",
        category: "",
        author: user?.name || "",
        imageUrl: "",
        tags: "",
        date: new Date().toISOString().slice(0, 10),
      });
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h1 className="h3 mb-1 text-center">Create Blog</h1>
                <p className="text-muted mb-4 text-center">Add a new post to your blog.</p>
                {message && <div className="alert alert-info">{message}</div>}
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
                value={blog.title}
                onChange={handleChange}
                required
                placeholder="Enter blog title"
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
                value={blog.description}
                onChange={handleChange}
                required
                placeholder="Write a short blog description..."
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
                value={blog.category}
                onChange={handleChange}
                required
                placeholder="e.g. Technology, Travel, Food"
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
                value={blog.author}
                onChange={handleChange}
                required
                placeholder="Enter author name"
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
                value={blog.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
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
                value={blog.tags}
                onChange={handleChange}
                placeholder="react, javascript, webdev"
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
                value={blog.date}
                onChange={handleChange}
                required
                placeholder="Select date"
              />
            </div>
                  <button type="submit" className="btn btn-primary fw-medium">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;