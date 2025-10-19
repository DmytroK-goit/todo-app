import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/todos");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todo, thunkAPI) => {
    try {
      const res = await api.post("/todos", todo);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.patch(`/todos/${id}`, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/todos/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
