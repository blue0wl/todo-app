import React, { useState } from 'react';
import './App.css'; // Optional: Add styles here or inline

// Single Todo Item Component
const TodoItem = ({ todo, index, markComplete, markUndo, removeTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  // Save edited todo
  const saveTodo = () => {
    editTodo(index, newText);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
        <div className="todo-listing">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="form-control edit-input"
        />
      ) : (
        <span style={{ textDecoration: todo.isComplete ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
      )}  </div>
      <div className="actions">
        {isEditing ? (
          <button onClick={saveTodo} className="btn btn-success" disabled={newText.trim() === ''}>
            Save
          </button>
        ) : (
          <>
            <button
              className="btn btn-primary"
              onClick={() => {todo.isComplete?markUndo(index):markComplete(index)}}
              disabled={isEditing}
            >
              {todo.isComplete?"Undo":"Complete"}
            </button>
            <button
              className="btn btn-warning"
              onClick={() => setIsEditing(true)}
              disabled={todo.isComplete || isEditing}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => removeTodo(index)}
              disabled={todo.isComplete || isEditing}
            >
              Remove
            </button>
            </>
        )}
      </div>
    </div>
  );
};

// Main Todo List Component
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Add new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, isComplete: false }]);
      setNewTodo('');
    }
  };

  // Mark todo as complete
  const markComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].isComplete = true;
    setTodos(newTodos);
  };

  const markUndo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isComplete = false;
    setTodos(newTodos);
  };

  // Edit a todo
  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  // Remove a todo
  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="todo-list-container">
        < div className="todo-title">
        <h1>Todo List</h1>
        </div>
      <div className="todo-input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          className="form-control"
        />
        <button onClick={addTodo} className="btn btn-success" disabled={newTodo.trim() === ''}>
          Add Todo
        </button>
      </div>

      {todos.length === 0 ? (
        <div className="no-todos-message"><strong>No todos available. Add a todo to get started!</strong></div>
      ) : (
        <div className="todo-list">
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              markComplete={markComplete}
              markUndo={markUndo}
              removeTodo={removeTodo}
              editTodo={editTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;


