import React, { useState } from "react";

import Sidebar from "./Sidebar";
import TodoWorkspace from "./TodoWorkspace";

const App = () => {
  const [collection, setCollection] = useState("");
  const [numberOfDone, setNumberOfDone] = useState(0);
  const [totalNumber, setTotalNumber] = useState(0);
  return (
    <>
      {/*
       * sidebar
       */}
      <Sidebar
        setCollection={setCollection}
        numberOfDone={numberOfDone}
        totalNumber={totalNumber}
      />
      {/*
       * input field
       */}
      <TodoWorkspace
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
