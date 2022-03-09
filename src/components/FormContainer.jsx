import React, { useState } from "react";
import { faPlus, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterTodo from "./FilterTodo";
import CreateTodo from "./CreateTodo";

const FormContainer = ({
  currentCollection,
  handleFilterOption,
  setRefreshList,
}) => {
  const [addTaskClicked, setAddTaskClicked] = useState(false);
  const [showFilterList, setShowFilterList] = useState(false);

  const handleFilterListOnClick = (e) => {
    setShowFilterList(!showFilterList);
  };

  const handleCloseInputFields = (e) => {
    setAddTaskClicked(!addTaskClicked);
    setShowFilterList(false);
  };

  const renderForm = () => {
    return (
      <div className="fields">
        <div className="fields-buttons">
          <button
            className={`btn add-task-btn glass ${addTaskClicked ? "hide" : ""}`}
            onClick={handleCloseInputFields}
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="add-task-icon"
            ></FontAwesomeIcon>
            Add a task
          </button>
          <button
            className={`btn btn-filter glass ${addTaskClicked ? "hide" : ""}`}
            onClick={handleFilterListOnClick}
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
        <CreateTodo
          currentCollection={currentCollection}
          setRefreshList={setRefreshList}
          addTaskClicked={addTaskClicked}
          handleCloseInputFields={handleCloseInputFields}
        ></CreateTodo>
      </div>
    );
  };
  return <>{renderForm()}</>;
};

export default FormContainer;
