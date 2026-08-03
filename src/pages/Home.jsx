import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";
import { deleteBlog, getBlogs } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const limit = 12;

  const getAllBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      getAllBlogs();
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    const newData = blogs.filter((item) => {
      const matchTitle = item.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory = category ? item.category === category : true;
      return matchTitle && matchCategory;
    });

    setFilterData(search.length > 0 || category ? newData : blogs);
    setPage(1);
  }, [search, category, blogs]);

  useEffect(() => {
    getAllBlogs();
  }, []);

  const categories = [...new Set(blogs.map((blog) => blog.category))].filter(
    Boolean
  );
  const totalPages = Math.ceil(filterData.length / limit);
  const start = (page - 1) * limit;
  const currentBlogs = filterData.slice(start, start + limit);

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="bg-white border rounded p-4 mb-4">
          <div className="row align-items-end g-3">
            <div className="col-lg-5">
              <h1 className="h3 mb-1">Latest Blogs</h1>
              <p className="text-muted mb-0">
                Read articles from different writers and categories.
              </p>
            </div>
            <div className="col-md-4 col-lg-4">
              <label htmlFor="search" className="form-label">
                Search
              </label>
              <input
                type="search"
                className="form-control"
                id="search"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-4 col-lg-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {message && <div className="alert alert-info">{message}</div>}
        {loading && <Loader />}

        <div className="row g-4">
          {currentBlogs.map((blog) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={blog.id}>
              <BlogCard
                blog={blog}
                onDelete={handleDelete}
                canManage={
                  user &&
                  (user.role === "admin" ||
                    String(user.id) === String(blog.userId))
                }
              />
            </div>
          ))}
        </div>

        {!loading && currentBlogs.length === 0 && (
          <p className="text-muted mt-3">No blogs found</p>
        )}

        {totalPages > 1 && (
          <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
            <button
              type="button"
              className="btn btn-primary btn-sm fw-medium"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span className="small text-muted">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              className="btn btn-primary btn-sm fw-medium"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;