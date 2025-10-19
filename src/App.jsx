import React from "react";
import TodosList from "./components/toDoList/toDoList.jsx";
import "./index.css";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>TODO App (JS) — JSONPlaceholder + Redux</h1>
      </header>
      <main className="app-main">
        <TodosList />
      </main>
      <footer className="app-footer">© Demo</footer>
    </div>
  );
}
