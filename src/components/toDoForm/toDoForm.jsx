import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTodo, updateTodo } from "../../redux/todo/operations";

export default function TodoForm({ editing = null, onDone = () => {} }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || "");
      setCompleted(Boolean(editing.completed));
    } else {
      setTitle("");
      setCompleted(false);
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (editing) {
      await dispatch(
        updateTodo({ id: editing.id, data: { title, completed } })
      ).unwrap();
      onDone();
    } else {
      await dispatch(createTodo({ title, completed, userId: 1 })).unwrap();
      setTitle("");
      setCompleted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title..."
        className="input"
      />
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Completed
      </label>
      <button type="submit" className="btn">
        {editing ? "Save" : "Add"}
      </button>
      {editing && (
        <button type="button" onClick={onDone} className="btn btn-ghost">
          Cancel
        </button>
      )}
    </form>
  );
}
