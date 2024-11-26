import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useSelector } from "react-redux";

const App = () => {
  const { lang } = useSelector((state) => state.lang);
  const { theme } = useSelector((state) => state.theme);
  const langText = {
    en: {
      title: "To-Do List",
    },
    id: {
      title: "Daftar Tugas",
    }
  }

  return (
    <div className={`container-fluid vh-100 ${theme === "dark" ? "bg-dark" : "bg-light"}`}>
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card shadow">
            <div className={`card-body ${theme === "dark" ? "bg-secondary text-white" : "bg-light text-dark"}`}>
              <h1 cy-data="todo-title" className="card-title text-center mb-4">{langText[lang].title}</h1>
              <TodoInput />
              <TodoList />
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default App;
