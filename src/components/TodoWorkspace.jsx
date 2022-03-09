import React, { createRef, useEffect, useState } from "react";
import "./../css/todoWorkspace.css";
import "./../css/forAll.css";
import TodoList from "./TodoList";
import FormContainer from "./FormContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisV,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const TodoWorkspace = ({
  collectionForDelete,
  collectionForEdit,
  setCollectionForDelete,
  setCollectionForEdit,
  collection,
  setNumberOfDone,
  setTotalNumber,
}) => {
  const [filterOption, setFilterOption] = useState("all");
  const [refreshList, setRefreshList] = useState(false);
  const [openCollectionOptions, setOpenCollectionOptions] = useState(false);

  const handleFilterOption = (e) => {
    setFilterOption(e.target.value);
  };

  useEffect(() => {
    setOpenCollectionOptions(false);
  }, [collection]);
  return (
    <div className="workspace">
      <div className="workspace-content">
        <div className="title-header">
          <div className="title">
            <div>{collection.collection}</div>
            <button
              className={`no-border-btn ${
                collection.collection === "Home" ? "hide" : ""
              }`}
              onClick={(e) => setOpenCollectionOptions(!openCollectionOptions)}
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
          </div>
          <div
            className={`options glass ${openCollectionOptions ? "" : "hide"}`}
          >
            <button
              className="no-border-btn"
              onClick={(e) => setCollectionForDelete(collection)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button
              className="no-border-btn"
              onClick={(e) => setCollectionForEdit(collection)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        </div>
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
