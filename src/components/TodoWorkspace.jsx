import React, { createRef, useEffect, useState } from "react";
import "./../css/todoWorkspace.css";
import "./../css/forAll.css";
import TodoList from "./TodoList";
import FormContainer from "./FormContainer";

const TodoWorkspace = ({ collection, setNumberOfDone, setTotalNumber }) => {
  const [filterOption, setFilterOption] = useState("all");
  const [refreshList, setRefreshList] = useState(false);

  const handleFilterOption = (e) => {
    setFilterOption(e.target.value);
  };

  return (
    <div className="workspace">
      <div className="workspace-content">
        <div className="title">{collection}</div>
        <FormContainer
          currentCollection={collection}
          handleFilterOption={handleFilterOption}
          setRefreshList={setRefreshList}
        ></FormContainer>
        <TodoList
          collection={collection}
          filter={filterOption}
          refreshList={refreshList}
          setRefreshList={setRefreshList}
          setNumberOfDone={setNumberOfDone}
          setTotalNumber={setTotalNumber}
        />
      </div>
    </div>
  );
};

export default TodoWorkspace;
