import {
  faCheck,
  faHome,
  faPerson,
  faSchool,
  faShop,
  faShoppingCart,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import server from "../api/server";

import "./../css/sidebar.css";

const Sidebar = ({ setCollection, totalNumber, numberOfDone }) => {
  const [productivity, setProductivity] = useState({ done: 0, total: 0 });

  const getNumberOfTodos = async () => {
    const response = await server.get("/todos");
    response.status === 200
      ? setProductivity({ ...productivity, total: response.data.length })
      : console.log(response);
    console.log(response);
  };
  const getNumberOfDoneTodos = async () => {
    const response = await server.get("/todos?completed=true");
    response.status === 200
      ? setProductivity({ ...productivity, done: response.data.length })
      : console.log(response);
    console.log(response);
  };
  useEffect(() => {
    setCollection("Personal");
    getNumberOfTodos();
    getNumberOfDoneTodos();
  }, []);

  const renderCollections = () => {
    return (
      <div className="collections">
        <button
          onClick={(e) => setCollection("School")}
          className="item  glass"
        >
          <FontAwesomeIcon icon={faSchool}></FontAwesomeIcon>
          <p>School</p>
        </button>
        <button onClick={(e) => setCollection("Shop")} className="item glass">
          <FontAwesomeIcon icon={faShop}></FontAwesomeIcon>
          <p>Shop</p>
        </button>
        <button
          onClick={(e) => setCollection("Shopping")}
          className="item glass"
        >
          <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
          <p>Shopping</p>
        </button>
        <button onClick={(e) => setCollection("Home")} className="item glass">
          <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
          <p>Home</p>
        </button>
        <button
          onClick={(e) => setCollection("Personal")}
          className="item glass"
        >
          <FontAwesomeIcon icon={faPerson}></FontAwesomeIcon>
          <p>Personal</p>
        </button>
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
