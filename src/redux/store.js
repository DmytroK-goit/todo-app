import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../redux/todo/slice.js";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
