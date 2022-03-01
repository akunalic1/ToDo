import React from "react";
import {
  faClose,
  faPlus,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TodoForm = ({
  handleFilterList,
  handleFilterOption,
  handleShowHideInputs,
  showAddTask,
  showFilterList,
}) => {
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
            onClick={handleFilterList}
          >
            Filter
            <FontAwesomeIcon
              icon={faAngleDown}
              className="add-task-icon"
            ></FontAwesomeIcon>
          </button>
          <div
            className={`filter-options glass ${!showFilterList ? "hide" : ""}`}
          >
            <button
              value={"all"}
              onClick={handleFilterOption}
              className="option glass"
            >
              All
            </button>
            <button
              value={"completed"}
              onClick={handleFilterOption}
              className="option glass"
            >
              Completed
            </button>
            <button
              value={"important"}
              onClick={handleFilterOption}
              className="option glass"
            >
              Important
            </button>
            <button
              value={"urgent"}
              onClick={handleFilterOption}
              className="option glass"
            >
              Urgent
            </button>
            <button
              value={"not-a-priority"}
              onClick={handleFilterOption}
              className="option glass"
            >
              Not a priority
            </button>
            <button
              value={"default"}
              onClick={handleFilterOption}
              className="option glass"
            >
              Other
            </button>
          </div>
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
  return <>{renderInputFields()}</>;
};

export default TodoForm;
