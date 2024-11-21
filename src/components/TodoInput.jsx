// src/components/TodoInput.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../redux/async/todoSlice";;
import { updateLang } from "../redux/slices/langSlice";
import { setTheme } from "../redux/slices/themeSlice";
import { v4 as uuidv4 } from "uuid";

const TodoInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { isUpdated, todo } = useSelector((state) => state.todos);
  const { lang } = useSelector((state) => state.lang);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    if (isUpdated) {
      setText(todo.text);
    }
  }, [isUpdated, todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      if (isUpdated) {
        dispatch(updateTodo({
          ...todo,
          text,
        }));
        setText("");
      } else {
      dispatch(addTodo({
        id: uuidv4(),
        text,
        completed: false,
      }));
      setText("");
      }
    }
  }

  const langText = {
    en: {
      placeholder: "Add a new task...",
      add: "Add",
      update: "Update",
      langSwitch: "ID",
    },
    id: {
      placeholder: "Tambah tugas baru...",
      add: "Tambah",
      update: "Perbarui",
      langSwitch: "ENG",
    },
  };

  return (
    <div className="mb-3">
      <div className="d-flex gap-3 mb-3">
        <button 
          onClick={() => dispatch(updateLang({ lang: lang === "en" ? "id" : "en" }))}
          className="btn btn-success border"
        >
          {langText[lang].langSwitch}
        </button>
        <button 
          onClick={() => dispatch(setTheme(theme === "light" ? "dark" : "light"))}
          className={`btn ${theme === "dark" ? "bg-light text-dark" : "btn-secondary text-light"}`}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder={langText[lang].placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button
          className={`btn ${isUpdated ? "btn-warning" : "btn-primary"}`}
          type="submit"
        >
          {isUpdated ? langText[lang].update : langText[lang].add}
        </button>
      </form>
    </div>
  );  
};

export default TodoInput;
