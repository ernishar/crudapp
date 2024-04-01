import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListData = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:4000/api/getBooks`, true);
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var json_obj = JSON.parse(xhr.responseText);
          if (json_obj.message === "success") {
            setBooks(json_obj.books);
          } else {
            console.error("Error message from server:", json_obj.message);
          }
        } else {
          console.error("Error status from server:", xhr.statusText);
        }
      }
    };
    xhr.onerror = function () {
      console.error("Network error occurred.");
    };
    xhr.send();
  };

  return (
    <div className="listdata">
      <div className=" d-flex gap-2">
        <Link to="/add">
          <button className="btn btn-primary">Go to Add Book</button>
        </Link>
        <Link to="/">
          <button className="btn btn-primary">Go to Home</button>
        </Link>
      </div>
      <h3>Books List</h3>
      <div className="main table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Published Year</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return (
                <tr key={book.book_id}>
                  <td>{book.title}</td>
                  <td>{book.description}</td>
                  <td>{book.published_year}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListData;
