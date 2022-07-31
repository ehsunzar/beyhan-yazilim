import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveBooks,
  findBooksByTitle,
  deleteAllBooks,
} from "../actions/books";
import { Link } from "react-router-dom";

const BooksList = () => {
  const [currentBook, setCurrentBook] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveBooks());
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const refreshData = () => {
    setCurrentBook(null);
    setCurrentIndex(-1);
  };

  const setActiveBook = (book, index) => {
    setCurrentBook(book);
    setCurrentIndex(index);
  };

  const removeAllBooks = () => {
    dispatch(deleteAllBooks())
      .then((response) => {
        console.log(response);
        refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findBooksByTitle(searchTitle));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Books List</h4>

        <ul className="list-group">
          {books &&
            books.map((book, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBook(book, index)}
                key={index}
              >
                {book.title}
              </li>
            ))}
        </ul>

        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllBooks}>
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentBook ? (
          <div>
            <h4>Book info</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentBook.title}
            </div>
            <div>
              <label>
                <strong>Writer:</strong>
              </label>{" "}
              {currentBook.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentBook.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/books/" + currentBook.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a book...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksList;
