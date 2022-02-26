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
import React from "react";

import "./../css/sidebar.css";

const Sidebar = () => {
  const renderCollections = () => {
    return (
      <div className="collections">
        <div className="item  glass">
          <FontAwesomeIcon icon={faSchool}></FontAwesomeIcon>
          <p>School</p>
        </div>
        <div className="item glass">
          <FontAwesomeIcon icon={faShop}></FontAwesomeIcon>
          <p>Shop</p>
        </div>
        <div className="item glass">
          <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
          <p>Shopping</p>
        </div>
        <div className="item glass">
          <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
          <p>Home</p>
        </div>
        <div className="item glass">
          <FontAwesomeIcon icon={faPerson}></FontAwesomeIcon>
          <p>Personal</p>
        </div>
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
            <p>(3)</p>
          </div>
        </div>
        <div className="item glass">
          <FontAwesomeIcon icon={faTasks}></FontAwesomeIcon>
          <div className="item-num">
            <p>Total tasks</p>
            <p>(33)</p>
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
