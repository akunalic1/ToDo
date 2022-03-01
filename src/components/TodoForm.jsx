import React from "react";
import {
  faClose,
  faPlus,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterTodo from "./FilterTodo";

const TodoForm = ({ handleShowHideInputs, showAddTask }) => {
  const renderInputFields = () => {
    return (
      <div className={`create-todo glass ${showAddTask ? "hide" : ""}`}>
        <div className="create-todo-top">
          <div className="inputs">
            <input className="create-title" placeholder="Task title..."></input>
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
    );
  };
  return <>{renderInputFields()}</>;
};

export default TodoForm;
