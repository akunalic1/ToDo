import {
  faCheck,
  faFolderTree,
  faTasks,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createRef, useEffect, useState } from "react";
import server from "../api/server";

import "./../css/sidebar.css";
import Todo from "./Todo";

const Sidebar = ({
  collectionForDelete,
  collectionForEdit,
  setCollectionForDelete,
  setCollectionForEdit,
  setCollection,
  totalNumber,
  numberOfDone,
}) => {
  const [collections, setCollections] = useState([]);
  const [collectionInput, setCollectionInput] = useState("");
  const [showCollectionInputField, setShowCollectionInputField] =
    useState(false);
  const [collectionAdded, setCollectionAdded] = useState(false);

  const createCollectionFieldRef = createRef();
  /*
   * useEffect
   */
  useEffect(() => {
    setCollection({ id: 1, collection: "Home" });
  }, []);

  useEffect(() => {
    const getCollections = async () => {
      const response = await server.get("/collections");
      if (response.status === 200) {
        setCollections(response.data);
        setCollectionAdded(false);
      }
    };
    getCollections();
  }, [collectionAdded, collectionForDelete]);

  useEffect(() => {
    if (
      Object.keys(collectionForEdit).length !== 0 &&
      collectionForEdit.id !== 1
    ) {
      setShowCollectionInputField(true);
      setCollectionInput(collectionForEdit.collection);

      createCollectionFieldRef.current.classList.add("focus-field");
    } else {
      setCollectionInput("");
      setShowCollectionInputField(false);
      createCollectionFieldRef.current.classList.remove("focus-field");
    }
  }, [collectionForEdit]);

  useEffect(() => {
    const deleteCollection = async () => {
      await server.delete(`/collections/${collectionForDelete.id}`);

      let allTodos = await server.get("/todos");
      if (allTodos.status === 200)
        allTodos = allTodos.data.forEach((todo) => {
          if (todo.collection === collectionForDelete.id)
            server.delete(`/todos/${todo.id}`);
        });

      setCollection({ id: 1, collection: "Home" });
      setCollectionForDelete("");
    };

    if (collectionForDelete.collection) deleteCollection();
  }, [collectionForDelete]);

  /*
   * functions
   */
  const submitCollectionName = (e) => {
    e.preventDefault();

    if (!collectionForEdit.collection) {
      const addCollection = async () => {
        const response = await server.post("/collections", {
          collection: collectionInput,
        });
        setCollectionAdded(true);
        console.log(response);
      };

      addCollection();
    } else {
      const editCollection = async () => {
        const response = await server.patch(
          `/collections/${collectionForEdit.id}`,
          {
            collection: collectionInput,
          }
        );
        setCollectionForEdit({});
        setCollectionAdded(true);
        setCollection({ ...collectionForEdit, collection: collectionInput });
      };
      editCollection();
    }
    setCollectionInput("");
    setShowCollectionInputField(false);
  };

  const renderColection = (item) => {
    return (
      <button
        key={item.collection}
        onClick={(e) => {
          setCollection(item);
          setShowCollectionInputField(false);
        }}
        className="item  glass"
      >
        <FontAwesomeIcon icon={faFolderTree}></FontAwesomeIcon>
        <p>{item.collection}</p>
      </button>
    );
  };

  const renderCollections = () => {
    return (
      <div className="collections">
        {collections.map((item) => renderColection(item))}
      </div>
    );
  };

  const renderProductivity = () => {
    return (
      <div className="productivity">
        <div className="item  glass">
          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
          <div className="item-num">
            <p>Done</p>
            <p>{numberOfDone}</p>
          </div>
        </div>
        <div className="item glass">
          <FontAwesomeIcon icon={faTasks}></FontAwesomeIcon>
          <div className="item-num">
            <p>Total tasks</p>
            <p>{totalNumber}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="sidebar glass">
      <div className="glass collections-wrapper">
        <div className="title">
          <div>Collections</div>
          <button
            onClick={(e) =>
              setShowCollectionInputField(!showCollectionInputField)
            }
            className="add-collection-button "
          >
            <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
          </button>
        </div>
        <form
          className={showCollectionInputField ? "" : "hide"}
          onSubmit={submitCollectionName}
        >
          <input
            ref={createCollectionFieldRef}
            value={collectionInput}
            onChange={(e) => setCollectionInput(e.target.value)}
            className="create-collection-field glass"
            placeholder="Type here..."
          ></input>
        </form>
        {renderCollections()}
      </div>
      <div className="todo-statistics glass">
        <div className="title">Productivity</div>
        {renderProductivity()}
      </div>
    </div>
  );
};

export default Sidebar;
