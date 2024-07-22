import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const handleAdd = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), todo, isCompleted: false }]);
      setTodo("");
    }
    saveToLS();
  };

  const handleEdit = (id) => {
    let t = todos.filter((i) => i.id === id);

    if (t.length > 0) {
      setTodo(t[0].todo);
      let newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
    } else {
      console.log("No todo found with id:", id);
    }
    saveToLS();
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
    saveToLS();
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen">
      <div className="container mx-auto lg:w-1/2 sm:w-full px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Todo List
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-center mb-6">
            <input
              type="text"
              className="w-full md:w-2/3 p-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter Task..."
              value={todo}
              onChange={handleChange}
            />
            <button
              onClick={handleAdd}
              className="w-full md:w-auto mt-2 md:mt-0 px-6 py-3 bg-purple-600 text-white font-semibold rounded-r-md hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              Add
            </button>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Your Todos
              </h2>
              <div className="flex items-center">
                <input
                  id="show"
                  onChange={toggleFinished}
                  type="checkbox"
                  checked={showFinished}
                  className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300 cursor-pointer"
                />
                <label className="ml-2 text-gray-700" htmlFor="show">
                  Show Finished
                </label>
              </div>
            </div>
            {todos.length === 0 && (
              <p className="text-gray-600 text-center">No todos to display</p>
            )}
            {todos.map((item) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 rounded-md mb-3"
                  >
                    <div className="flex items-center w-full md:w-2/3 mb-2 md:mb-0">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300 cursor-pointer"
                        onChange={() => handleCheckbox(item.id)}
                        checked={item.isCompleted}
                      />
                      <p
                        className={`ml-3 ${
                          item.isCompleted
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                        } text-lg break-all`}
                      >
                        {item.todo}
                      </p>
                    </div>
                    <div className="flex justify-end w-full md:w-1/3">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out mr-2"
                      >
                        <FaEdit className="text-xl" />
                      </button>
                      <button
                        className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                        onClick={() => handleDelete(item.id)}
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
