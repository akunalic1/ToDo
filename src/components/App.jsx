import React, { useState } from "react";

import Sidebar from "./Sidebar";
import TodoWorkspace from "./TodoWorkspace";

const App = () => {
  const [collection, setCollection] = useState("");
  return (
    <>
      {/*
       * sidebar
       */}
      <Sidebar setCollection={setCollection} />
      {/*
       * input field
       */}
      <TodoWorkspace collection={collection} />

      {/*
       * todolist
       */}
    </>
  );
};

export default App;
