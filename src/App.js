import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Load saved todos when app starts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTodos([...todos, { text: task, done: false }]);
      setTask(""); // Clear input after adding
    }
  };

  const deleteTask = (indexToDelete) => {
    const newTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(newTodos);
  };

  const toggleDone = (indexToToggle) => {
    const updatedTodos = todos.map((todo, index) =>
      index === indexToToggle ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <h1>📝 To-Do List</h1>

      <button onClick={() => setDarkMode(!darkMode)}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(index)}
            />
            <span
              style={{ textDecoration: todo.done ? "line-through" : "none" }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTask(index)}
              style={{ marginLeft: "10px" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
