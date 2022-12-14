import {
  CREATE_BOOK,
  RETRIEVE_BOOKS,
  UPDATE_BOOK,
  DELETE_BOOK,
  DELETE_ALL_BOOKS,
} from "./types";

import BookDataService from "../services/BookService";

export const createBook = (title, description) => async (dispatch) => {
  try {
    const res = await BookDataService.create({ title, description });

    dispatch({
      type: CREATE_BOOK,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveBooks = () => async (dispatch) => {
  try {
    const res = await BookDataService.getAll();

    dispatch({
      type: RETRIEVE_BOOKS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateBook = (id, data) => async (dispatch) => {
  try {
    const res = await BookDataService.update(id, data);

    dispatch({
      type: UPDATE_BOOK,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteBook = (id) => async (dispatch) => {
  try {
    await BookDataService.remove(id);

    dispatch({
      type: DELETE_BOOK,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllBooks = () => async (dispatch) => {
  try {
    const res = await BookDataService.removeAll();

    dispatch({
      type: DELETE_ALL_BOOKS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findBooksByTitle = (title) => async (dispatch) => {
  try {
    const res = await BookDataService.findByTitle(title);

    dispatch({
      type: RETRIEVE_BOOKS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
