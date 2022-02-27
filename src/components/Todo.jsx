import {
  faCheckCircle,
  faComment,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./../css/todo.css";

const Todo = ({ todo }) => {
  console.log(todo);
  return (
    <div className={`todo-item glass ${todo.status}-border`}>
      <div className="check-it">
        <input type={"checkbox"} className="checkbox"></input>
      </div>

      <div className="todo-content">
        <div className="todo-content-first-row">
          <p className="todo-title">{todo.title}</p>
          <p className="todo-date">{todo.createdAt}</p>
        </div>
        <p className="todo-description">{todo.text}</p>
      </div>

      <div className="todo-icons">
        <button>
          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
        </button>
        <button className="comment-btn">
          <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
          <div className="comment-exist"></div>
        </button>
      </div>
    </div>
  );
};

export default Todo;
