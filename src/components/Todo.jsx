import { faComment, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, createRef } from "react";
import DeleteTodo from "./DeleteTodo";
import "./../css/todo.css";
import server from "../api/server";
import Comment from "./Comment";

const Todo = ({ todo, setRefreshList }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [todoCompleted, setTodoCompleted] = useState(todo.completed);
  const todoRef = createRef();

  const handleDeleteTodo = (e) => {
    setOpenDelete(!openDelete);
  };
  const handleCheckboxClick = (e) => {
    console.log(todoRef.current);
    if (e.target.checked) {
      todoRef.current.classList.add("completed-todo");
      server.patch(`/todos/${todo.id}`, {
        completed: true,
      });
      setTodoCompleted(true);
    } else {
      todoRef.current.classList.remove("completed-todo");
      server.patch(`/todos/${todo.id}`, {
        completed: false,
      });
      setTodoCompleted(false);
    }
    setRefreshList(true);
    console.log("item clicked ", e.target.checked);
  };

  return (
    <div>
      <div
        ref={todoRef}
        className={`todo-item glass ${todo.status}-border ${
          todo.completed ? "completed-todo" : ""
        }`}
      >
        <div className="check-it">
          <input
            checked={todoCompleted}
            onChange={handleCheckboxClick}
            type={"checkbox"}
            className="checkbox"
          ></input>
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
          <button onClick={handleDeleteTodo}>
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </button>
          <Comment todo={todo}></Comment>
        </div>
      </div>
      <DeleteTodo
        todo={todo}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        setRefreshList={setRefreshList}
      />
    </div>
  );
};

export default Todo;
