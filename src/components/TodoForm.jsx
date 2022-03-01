import React, { createRef, useEffect, useState } from "react";
import {
  faClose,
  faPlus,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterTodo from "./FilterTodo";
import server from "../api/server";

const TodoForm = ({ handleShowHideInputs, showAddTask }) => {
  const titleRef = createRef();
  const descriptionRef = createRef();
  const statusBtnsRef = createRef();
  const formRef = createRef();
  let statusList = [];
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!errorMessage.length && titleRef.current.value.length) {
      const saveTodo = async () => {
        const response = await server.post("/todos", {
          title: titleRef.current.value,
          text: descriptionRef.current.value,
          createdAt: new Date().toDateString(),
          status: statusList[0],
          comment: "",
          completed: false,
        });

        console.log(response);
      };
      saveTodo();
    }
  }, [errorMessage]);

  const handleStatusClicked = (e) => {
    e.preventDefault();
    if (statusList.includes(e.target.value)) {
      statusList.pop();
      e.target.classList.add("not-clicked");
    } else {
      Array.from(statusBtnsRef.current.children).forEach((button) =>
        button.classList.add("not-clicked")
      );
      e.target.classList.remove("not-clicked");
      statusList.push(e.target.value);
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!titleRef.current.value || !titleRef.current.value.trim().length)
      setErrorMessage("Title cannot be empty");
    else {
      const saveTodo = async () => {
        const response = await server.post("/todos", {
          title: titleRef.current.value,
          text: descriptionRef.current.value,
          createdAt: new Date().toLocaleDateString("en-US"),
          status: statusList.length === 0 ? "default" : statusList[0],
          comment: "",
          completed: false,
        });

        console.log(response);
      };
      saveTodo();
      formRef.current.reset();
    }
  };
  const renderInputFields = () => {
    return (
      <form
        ref={formRef}
        className={`create-todo glass ${showAddTask ? "hide" : ""}`}
      >
        <div className="create-todo-top">
          <div className="inputs">
            <input
              ref={titleRef}
              className="create-title"
              placeholder="Task title..."
            ></input>
            <input
              ref={descriptionRef}
              className="create-description"
              placeholder="Description..."
            ></input>
          </div>
          <button className="close-icon glass" onClick={handleShowHideInputs}>
            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
          </button>
        </div>
        <p className="label">Set as:</p>
        <div className="create-status">
          <div ref={statusBtnsRef} className="status-btns">
            <button
              value={"urgent"}
              onClick={handleStatusClicked}
              className="btn urgent not-clicked"
            >
              urgent
            </button>
            <button
              value={"important"}
              onClick={handleStatusClicked}
              className="btn important not-clicked"
            >
              important
            </button>
            <button
              value={"not-a-priority"}
              onClick={handleStatusClicked}
              className="btn not-a-priority not-clicked"
            >
              not priority
            </button>
          </div>
        </div>
        <p className="error-message">{errorMessage}</p>
        <button onClick={handleSubmitForm} className="btn glass btn-submit">
          Submit
        </button>
      </form>
    );
  };
  return <>{renderInputFields()}</>;
};

export default TodoForm;
