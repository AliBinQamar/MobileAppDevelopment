import React, { useState } from 'react';
import './App.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Function to handle adding a new todo
  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(), // Use a timestamp for a unique ID
        text: inputValue.trim(),
      };
      setTodos([...todos, newTodo]);
      setInputValue(''); // Clear the input field
    }
  };

  // Function to handle deleting a todo by its ID
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Component to render an individual todo item
  const TodoItem = ({ todo, onDelete }) => (
    <li className="todo-item">
      <span>{todo.text}</span>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );

  return (
    <div className="todo-list-container">
      <h1>Simple To-Do List</h1>
      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo();
            }
          }}
          placeholder="Add a new task..."
        />
        <button className="add-btn" onClick={handleAddTodo}>
          Add to List
        </button>
      </div>

      {/* Render the list of todos */}
      {todos.length === 0 ? (
        <p className="no-tasks">All tasks complete! Add something new.</p>
      ) : (
        <ul className="todos-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;