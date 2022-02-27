import React from "react";

import Sidebar from "./Sidebar";
import TodoWorkspace from "./TodoWorkspace";

const App = () => {
  return (
    <>
      {/*
       * sidebar
       */}
      <Sidebar />
      {/*
       * input field
       */}
      <TodoWorkspace />

      {/*
       * todolist
       */}
    </>
  );
};

export default App;
