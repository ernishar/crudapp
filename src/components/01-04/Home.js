import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex gap-4">
      <Link to="/add">
        <button type="button" class="btn btn-secondary">
          Add Book
        </button>
      </Link>
      <Link to="/listdata">
        <button type="button" class="btn btn-secondary">
          Books
        </button>
      </Link>
    </div>
  );
};

export default Home;
