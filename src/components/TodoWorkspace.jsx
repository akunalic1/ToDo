import React, { createRef, useEffect, useState } from "react";
import "./../css/todoWorkspace.css";
import "./../css/forAll.css";
import TodoList from "./TodoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faPlus,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import TodoForm from "./TodoForm";
import ShowHideForm from "./ShowHideForm";

const TodoWorkspace = ({ collection }) => {
  const [showAddTask, setShowAddTask] = useState(true);
  const [showFilterList, setShowFilterList] = useState(false);
  const [filterOption, setFilterOption] = useState("all");

  const handleShowHideInputs = (e) => {
    setShowAddTask(!showAddTask);
    setShowFilterList(false);
  };
  const handleFilterList = (e) => {
    setShowFilterList(!showFilterList);
  };
  const handleFilterOption = (e) => {
    setFilterOption(e.target.value);
  };

  return (
    <div className="workspace">
      <div className="workspace-content">
        <div className="title">{collection}</div>
        <ShowHideForm
          handleFilterList={handleFilterList}
          handleShowHideInputs={handleShowHideInputs}
          handleFilterOption={handleFilterOption}
          showAddTask={showAddTask}
          showFilterList={showFilterList}
        ></ShowHideForm>
        <TodoList filter={filterOption} />
      </div>
    </div>
  );
};

export default TodoWorkspace;
