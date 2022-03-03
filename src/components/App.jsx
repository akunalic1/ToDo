import React, { useState } from "react";

import Sidebar from "./Sidebar";
import TodoWorkspace from "./TodoWorkspace";

const App = () => {
  const [collection, setCollection] = useState("Home");
  const [numberOfDone, setNumberOfDone] = useState(0);
  const [totalNumber, setTotalNumber] = useState(0);
  const [collectionForEdit, setCollectionForEdit] = useState("");
  const [collectionForDelete, setCollectionForDelete] = useState("");
  return (
    <>
      {/*
       * sidebar
       */}
      <Sidebar
        collectionForDelete={collectionForDelete}
        collectionForEdit={collectionForEdit}
        setCollectionForDelete={setCollectionForDelete}
        setCollectionForEdit={setCollectionForEdit}
        setCollection={setCollection}
        currentCollection={collection}
        numberOfDone={numberOfDone}
        totalNumber={totalNumber}
      />
      {/*
       * input field
       */}
      <TodoWorkspace
        collectionForDelete={collectionForDelete}
        collectionForEdit={collectionForEdit}
        setCollectionForDelete={setCollectionForDelete}
        setCollectionForEdit={setCollectionForEdit}
        collection={collection}
        setNumberOfDone={setNumberOfDone}
        setTotalNumber={setTotalNumber}
      />

      {/*
       * todolist
       */}
    </>
  );
};

export default App;
