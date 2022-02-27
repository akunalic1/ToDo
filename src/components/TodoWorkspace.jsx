import React from "react";
import "./../css/todoWorkspace.css";

const TodoWorkspace = () => {
  const renderInputFields = () => {
    return (
      <div className="create-todo glass">
        <input className="create-title" placeholder="Task title..."></input>
        <input
          className="create-description"
          placeholder="Description..."
        ></input>
        <p className="label">Set as:</p>
        <div className="create-status">
          <div className="status-btns">
            <button className="btn urgent">urgent</button>
            <button className="btn important">important</button>
            <button className="btn not-priority">not priority</button>
          </div>
          <div>
            <button className="btn default">+</button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="workspace">
      <div className="workspace-content">{renderInputFields()}</div>
    </div>
  );
};

export default TodoWorkspace;
