import React, { createRef, useEffect, useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import server from "../api/server";

const TodoForm = ({
  handleCloseInputFields,
  addTaskClicked,
  setRefreshList,
  todo,
  setOpenEdit,
  onSubmit,
}) => {
  /*
   * hooks
   */
  const statusBtnsRef = createRef();
  const formRef = createRef();
  const [statusList, setStatusList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [response, setResponse] = useState({});

  /*
   * functions
   */
  const setInitialStatusButtons = (statusBtnsRef) => {
    Array.from(statusBtnsRef.current.children).forEach((button) => {
      if (button.classList.contains(todo.status)) {
        button.classList.remove("not-clicked");
        setStatusList([todo.status]);
      }
    });
  };
  /*
   * useEffect
   */
  useEffect(() => {
    Array.from(statusBtnsRef.current.children).forEach((button) =>
      button.classList.add("not-clicked")
    );
    setRefreshList(true);
    setErrorMessage("");
    setTitle("");
    setDescription("");
  }, [response]);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.text);
      setInitialStatusButtons(statusBtnsRef);
    }
  }, [addTaskClicked]);

  /*
   * event handlers
   */
  const handleStatusClicked = (e) => {
    e.preventDefault();
    if (statusList.includes(e.target.value)) {
      setStatusList([]);
      e.target.classList.add("not-clicked");
    } else {
      Array.from(statusBtnsRef.current.children).forEach((button) =>
        button.classList.add("not-clicked")
      );
      e.target.classList.remove("not-clicked");
      setStatusList([e.target.value]);
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!title.trim().length) setErrorMessage("Title cannot be empty");
    else onSubmit(title, description, statusList, setStatusList, setResponse);
  };

  const renderInputFields = () => {
    return (
      <form
        ref={formRef}
        className={`create-todo glass ${!addTaskClicked ? "hide" : ""}`}
      >
        <div className="create-todo-top">
          <div className="inputs">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="create-title"
              placeholder="Task title..."
            ></input>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="create-description"
              placeholder="Description..."
            ></input>
          </div>
          <button
            className="close-icon glass"
            onClick={(e) => {
              e.preventDefault();
              handleCloseInputFields(e);
            }}
          >
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
