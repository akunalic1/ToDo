import React, { createRef } from "react";
import {
  faClose,
  faPlus,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterTodo from "./FilterTodo";

const TodoForm = ({ handleShowHideInputs, showAddTask }) => {
  const titleRef = createRef();
  const descriptionRef = createRef();
  let statusList = [];

  const handleStatusClicked = (e) => {
    if (statusList.includes(e.target.value)) {
      e.target.classList.add("not-clicked");
      const indexOfStatus = statusList.indexOf(e.target.value);
      statusList.splice(indexOfStatus, 1);
    } else {
      e.target.classList.remove("not-clicked");
      statusList.push(e.target.value);
    }
    console.log(statusList);
  };

  const renderInputFields = () => {
    return (
      <div className={`create-todo glass ${showAddTask ? "hide" : ""}`}>
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
          <div className="status-btns">
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
        <button className="btn glass btn-submit">Submit</button>
      </div>
    );
  };
  return <>{renderInputFields()}</>;
};

export default TodoForm;
