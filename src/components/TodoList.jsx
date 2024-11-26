import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo, currentTodo, toggleTodo } from "../redux/async/todoSlice"

const TodoList = () => {
  const { todos, loading, error, isSuccess } = useSelector((state) => state.todos);
  const { lang } = useSelector((state) => state.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchTodos());
    }
  }, [isSuccess]);

  const langText = {
    en: {
      noTasks: "No tasks yet.",
      edit: "Edit",
      delete: "Delete",
    },
    id: {
      noTasks: "Belum ada tugas.",
      edit: "Ubah",
      delete: "Hapus",
    },
  };

  const handleEditClick = (e, todo) => {
    e.stopPropagation();
    dispatch(currentTodo(todo));
  };

  if (loading) {
    return <p className="alert alert-secondary text-center">Loading...</p>;
  }

  if (error) {
    return <p className="alert alert-danger text-center">{error}</p>;
  }

  if (todos.length === 0) {
    return <p cy-data="no-task" className="alert alert-secondary text-center">{langText[lang].noTasks}</p>;
  }

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo.id}
          onClick={() => dispatch(toggleTodo(todo))}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? "list-group-item-secondary" : ""
          }`}
        >
          <span
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>

          <div className="d-flex gap-2">
            <button
              cy-data="edit-button"
              onClick={(e) => handleEditClick(e, todo)}
              className="btn btn-warning btn-sm"
            >
              {langText[lang].edit}
            </button>

            <button
              cy-data="delete-button"
              className="btn btn-danger btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(deleteTodo(todo.id));
              }}
            >
              {langText[lang].delete}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
