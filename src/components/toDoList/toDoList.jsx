import { useEffect, useState } from "react";

import TodoItem from "../toDoItem/ToDoItem";
import TodoForm from "../toDoForm/toDoForm";
import Pagination from "../paganation/paganation";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../../redux/todo/operations";
import {
  selectError,
  selectLoading,
  selectTodos,
} from "../../redux/todo/selectors";

export default function TodosList() {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filtered = items.filter((t) =>
    t.title?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const pageItems = filtered.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  return (
    <div className="todos-container p-6 max-w-3xl mx-auto text-gray-100">
      <div className="flex flex-col justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-emerald-400">Todo List</h2>
        <div className="flex gap-3 w-full justify-between">
          <input
            placeholder="Search by title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 w-1/2 rounded-xl border border-gray-700 bg-gray-100 text-white focus:outline-none"
          />
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="w-1/6 bg-gray-800 text-white border border-gray-700 px-2 py-2 rounded-xl"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <TodoForm
          onSubmit={(title) =>
            dispatch(createTodo({ title, completed: false, userId: 1 }))
          }
        />
      </div>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}

      <div className="flex flex-col gap-3">
        {pageItems.length > 0 ? (
          pageItems.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() =>
                dispatch(
                  updateTodo({
                    id: todo.id,
                    data: { completed: !todo.completed },
                  })
                )
              }
              onDelete={() => dispatch(deleteTodo(todo.id))}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center">No todos found.</p>
        )}
      </div>

      <div className="mt-6">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
