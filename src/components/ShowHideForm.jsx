import React from "react";
import {
  faClose,
  faPlus,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterTodo from "./FilterTodo";
import TodoForm from "./TodoForm";

const ShowHideForm = ({
  handleFilterList,
  handleFilterOption,
  handleShowHideInputs,
  showAddTask,
  showFilterList,
}) => {
  const renderForm = () => {
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
            <FilterTodo handleFilterOption={handleFilterOption} />
          </div>
        </div>
        <TodoForm
          handleShowHideInputs={handleShowHideInputs}
          showAddTask={showAddTask}
        />
      </div>
    );
  };
  return <>{renderForm()}</>;
};

export default ShowHideForm;
