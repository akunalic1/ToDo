import React, { createRef, useState } from "react";
import "./../css/todoWorkspace.css";
import "./../css/forAll.css";
import TodoList from "./TodoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faPlus,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

const TodoWorkspace = ({ collection }) => {
  const [showAddTask, setShowAddTask] = useState(true);
  const inputFieldsRef = createRef();
  const handleShowHideInputs = (e) => {
    setShowAddTask(!showAddTask);
  };

  const renderInputFields = () => {
    return (
      <div className="fields">
        <div className="fields-buttons">
          <button
            className={`btn add-task-btn glass ${!showAddTask ? "hide" : ""}`}
            onClick={handleShowHideInputs}
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="add-task-icon"
            ></FontAwesomeIcon>
            Add a task
          </button>
          <button
            className={`btn btn-filter glass ${!showAddTask ? "hide" : ""}`}
          >
            Filter
            <FontAwesomeIcon
              icon={faAngleDown}
              className="add-task-icon"
            ></FontAwesomeIcon>
          </button>
        </div>
        <div className={`create-todo glass ${showAddTask ? "hide" : ""}`}>
          <div className="create-todo-top">
            <div className="inputs">
              <input
                className="create-title"
                placeholder="Task title..."
              ></input>
              <input
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
            <div className="status-btns">
              <button className="btn urgent">urgent</button>
              <button className="btn important">important</button>
              <button className="btn not-priority">not priority</button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="workspace">
      <div className="workspace-content">
        <div className="title">{collection}</div>
        {renderInputFields()}
        <TodoList />
      </div>
    </div>
  );
};

export default TodoWorkspace;
