import { useState } from "react";
import { useDispatch } from "react-redux";

import TodoForm from "../toDoForm/toDoForm.jsx";
import { deleteTodo, updateTodo } from "../../redux/todo/operations.js";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const handleDelete = async () => {
    await dispatch(deleteTodo(todo.id)).unwrap();
  };

  const handleToggle = async () => {
    try {
      await dispatch(
        updateTodo({ id: todo.id, data: { completed: !todo.completed } })
      ).unwrap();
    } catch (err) {
      console.error("Failed to toggle todo", err);
    }
  };

  if (editing) {
    return <TodoForm editing={todo} onDone={() => setEditing(false)} />;
  }

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <div className="title">{todo.title}</div>
      </div>

      <div className="actions">
        <button onClick={() => setEditing(true)} className="btn btn-small">
          Edit
        </button>
        <button onClick={handleDelete} className="btn btn-small btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}
