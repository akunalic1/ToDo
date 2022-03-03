import {
  faCheck,
  faHome,
  faPerson,
  faSchool,
  faShop,
  faFolderTree,
  faShoppingCart,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import server from "../api/server";

import "./../css/sidebar.css";
import Todo from "./Todo";

const Sidebar = ({ setCollection, totalNumber, numberOfDone }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setCollection("Personal");
    const getDistinctCollections = async () => {
      const response = await server.get("/todos");
      if (response.status === 200) {
        setCollections([
          ...new Set(response.data.map((todo) => todo.collection)),
        ]);
      }
      console.log("kolekcije ", collections);
    };
    getDistinctCollections();
  }, []);

  const renderColection = (collectionName) => {
    return (
      <button
        key={collectionName}
        onClick={(e) => setCollection(collectionName)}
        className="item  glass"
      >
        <FontAwesomeIcon icon={faFolderTree}></FontAwesomeIcon>
        <p>{collectionName}</p>
      </button>
    );
  };

  const renderCollections = () => {
    return (
      <div className="collections">
        {collections.map((name) => renderColection(name))}
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
        <div className="title">Collections</div>
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
