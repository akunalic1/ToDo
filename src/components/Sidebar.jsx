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
  useEffect(() => {
    setCollection("Home");
  }, []);

  useEffect(() => {
    const getCollections = async () => {
      const response = await server.get("/collections");
      if (response.status === 200) {
        console.log(response);
        setCollections(response.data);
        setCollectionAdded(false);
      }
    };
    getCollections();
  }, [collectionAdded, collectionForDelete]);

  useEffect(() => {
    if (collectionForEdit !== "") {
      setCollectionInput(collectionForEdit);
      setShowCollectionInputField(true);
      createCollectionFieldRef.current.classList.add("focus-field");
    } else {
      setCollectionInput("");
      setShowCollectionInputField(false);
      createCollectionFieldRef.current.classList.remove("focus-field");
    }
  }, [collectionForEdit]);

  useEffect(() => {
    const deleteCollection = async () => {
      const res1 = await server
        .delete(
          `/collections/${
            collections.find((x) => x.collection === collectionForDelete).id
          }`
        )
        .catch((e) => console.log(e));
      console.log(
        collections.find((x) => x.collection === collectionForDelete).id
      );
      setCollection("Home");
      setCollectionForDelete("");
      console.log("Obrsisano ", collectionForDelete);
    };

    if (collectionForDelete.length) deleteCollection();
  }, [collectionForDelete]);

  const submitCollectionName = (e) => {
    e.preventDefault();
    if (!collectionForEdit.length) {
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
          `/collections/${
            collections.find((x) => x.collection === collectionForEdit).id
          }`,
          {
            collection: collectionInput,
          }
        );
        setCollectionAdded(true);
        setCollectionForEdit("");
        console.log(response);
      };
      editCollection();
    }
    setCollectionInput("");
    setShowCollectionInputField(false);
  };

  const renderColection = (name) => {
    return (
      <button
        key={name}
        onClick={(e) => {
          setCollection(name);
          setShowCollectionInputField(false);
        }}
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
        {collections.map((item) => renderColection(item.collection))}
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
