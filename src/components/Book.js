import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBook, deleteBook } from "../actions/books";
import BookDataService from "../services/BookService";

const Book = (props) => {
  const initialBookState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [currentBook, setCurrentBook] = useState(initialBookState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getBook = (id) => {
    BookDataService.get(id)
      .then((response) => {
        setCurrentBook(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBook(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  const updateStatus = (status) => {
    const data = {
      id: currentBook.id,
      title: currentBook.title,
      description: currentBook.description,
      published: status,
    };

    dispatch(updateBook(currentBook.id, data))
      .then((response) => {
        console.log(response);

        setCurrentBook({ ...currentBook, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateBook(currentBook.id, currentBook))
      .then((response) => {
        console.log(response);

        setMessage("The book was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeBook = () => {
    dispatch(deleteBook(currentBook.id))
      .then(() => {
        props.history.push("/books");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBook ? (
        <div className="edit-form">
          <h4>Book</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentBook.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Writer</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBook.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBook.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentBook.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removeBook}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Book;
