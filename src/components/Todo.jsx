import { faComment, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, createRef } from "react";
import DeleteTodo from "./DeleteTodo";
import "./../css/todo.css";
import server from "../api/server";
import Comment from "./Comment";
import EditTodo from "./EditTodo";

const Todo = ({ todo, setRefreshList, refreshList }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [todoCompleted, setTodoCompleted] = useState(todo.completed);
  const [openEdit, setOpenEdit] = useState(false);
  const [response, setResponse] = useState({});
  const todoRef = createRef();

  const handleDeleteTodo = (e) => {
    setOpenDelete(!openDelete);
  };
  const handleCheckboxClick = (e) => {
    console.log(todoRef.current);
    if (e.target.checked) {
      todoRef.current.classList.add("completed-todo");
      const completeTodo = async () => {
        const res = await server.patch(`/todos/${todo.id}`, {
          completed: true,
        });
        setTodoCompleted(true);
        console.log("todo changed", res.data);
        setResponse(res);
      };
      completeTodo();
    } else {
      todoRef.current.classList.remove("completed-todo");
      const completeTodo = async () => {
        const res = await server.patch(`/todos/${todo.id}`, {
          completed: false,
        });
        setTodoCompleted(false);
        console.log("todo changed", res.data);
        setResponse(res);
      };
      completeTodo();
    }
    console.log("item clicked ", e.target.checked);
  };
  useEffect(() => {
    console.log("use effect za refresh");
    setRefreshList(true);
  }, [response]);

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
          <button onClick={(e) => setOpenEdit(!openEdit)}>
            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
          </button>
          <button onClick={handleDeleteTodo}>
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </button>
          <Comment todo={todo}></Comment>
        </div>
      </div>
      <EditTodo
        todo={todo}
        setRefreshList={setRefreshList}
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
      ></EditTodo>
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
