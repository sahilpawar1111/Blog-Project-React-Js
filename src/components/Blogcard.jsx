import { Link } from "react-router-dom";

const BlogCard = ({ blog, onDelete, canManage }) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          className="card-img-top"
          alt={blog.title}
          style={{ height: "180px", objectFit: "cover" }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <div className="mb-2">
          <span className="badge text-bg-light border">{blog.category}</span>
        </div>
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text text-secondary">{blog.description}</p>
        <div className="small text-muted mb-3 mt-auto">
          <div>By {blog.author}</div>
          <div>{blog.date}</div>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <Link
            to={`/blog/${blog.id}`}
            className="btn btn-primary btn-sm fw-medium"
          >
            View
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
                onClick={() => onDelete(blog.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;