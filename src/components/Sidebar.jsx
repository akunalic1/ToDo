import {
  faCheck,
  faFolderTree,
  faTasks,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import server from "../api/server";

import "./../css/sidebar.css";
import Todo from "./Todo";

const Sidebar = ({ setCollection, totalNumber, numberOfDone }) => {
  const [collections, setCollections] = useState([]);
  const [collectionInput, setCollectionInput] = useState("");
  const [showCollectionInputField, setShowCollectionInputField] =
    useState(false);

  useEffect(() => {
    setCollection("Personal");
  }, []);
  useEffect(() => {
    const getCollections = async () => {
      const response = await server.get("/collections");
      if (response.status === 200) {
        console.log(response);
        setCollections(response.data.map((x) => x.collection));
      }
    };
    getCollections();
  }, [collections]);

  const submitCollectionName = (e) => {
    e.preventDefault();
    const addCollection = async () => {
      const response = await server.post("/collections", {
        collection: collectionInput,
      });
      console.log(response);
    };
    addCollection();
    setCollectionInput("");
    setShowCollectionInputField(false);
  };

  const renderColection = (name) => {
    return (
      <button
        key={name}
        onClick={(e) => setCollection(name)}
        className="item  glass"
      >
        <FontAwesomeIcon icon={faFolderTree}></FontAwesomeIcon>
        <p>{name}</p>
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
