import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/todos";

const initialState = {
  todos: [],
  todo: {},
  isUpdated: false,
  isLoading: false,
  error: null,
  isSuccess: false,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  const response = await axios.put(`${API_URL}/${todo.id}`, todo);
  return response.data;
});

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (todo) => {
  const response = await axios.put(`${API_URL}/${todo.id}`, {
    ...todo,
    completed: !todo.completed,
  });
  return response.data;
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    currentTodo: (state, action) => {
      state.isUpdated = true;
      state.todo = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetch todos
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Something went wrong";
    });

    //  add todo
    builder.addCase(addTodo.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(addTodo.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.error = action.payload || "Something went wrong";
    });

    //  delete todo
    builder.addCase(deleteTodo.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(deleteTodo.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.error = action.payload || "Something went wrong";
    });

    //  update todo
    builder.addCase(updateTodo.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isUpdated = false;
    });

    builder.addCase(updateTodo.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isUpdated = false;
    });

    builder.addCase(updateTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.error = action.payload || "Something went wrong";
    });

    //  toggle todo
    builder.addCase(toggleTodo.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });

    builder.addCase(toggleTodo.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });

    builder.addCase(toggleTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export default todosSlice.reducer;
export const { currentTodo } = todosSlice.actions;
