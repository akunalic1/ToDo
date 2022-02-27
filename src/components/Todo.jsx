import {
  faCheckCircle,
  faComment,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./../css/todo.css";

const Todo = ({ todo }) => {
  const [comment, setComment] = useState(false);
  const [openComment, setOpenComent] = useState(false);

  useEffect(() => {
    setComment(todo.comment !== "");
  }, []);

  const handleOpenComment = (e) => {
    setOpenComent(!openComment);
  };

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
        <div className="comment-wrapper">
          <button onClick={handleOpenComment} className="comment-btn">
            <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
            <div className={comment ? `comment-exist` : ""}></div>
          </button>
          <div
            className={`comment-content ${
              !openComment || !comment ? "hide" : ""
            }`}
          >
            {todo.comment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
