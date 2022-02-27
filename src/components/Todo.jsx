import React from "react";

const Todo = ({ todo }) => {
  console.log(todo);
  return (
    <div className={`todo-item glass ${todo.status}-border`}>
      <p className="todo-title">{todo.title}</p>
      <p className="todo-description">{todo.text}</p>
      <p className="todo-date">{todo.createdAt}</p>
    </div>
  );
};

export default Todo;
