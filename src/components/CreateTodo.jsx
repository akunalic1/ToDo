import React from "react";
import TodoForm from "./TodoForm";
import server from "../api/server";

const CreateTodo = ({
  setRefreshList,
  addTaskClicked,
  handleCloseInputFields,
}) => {
  const handleUpdateTodo = (
    title,
    description,
    statusList,
    setStatusList,
    setResponse
  ) => {
    const saveTodo = async () => {
      const response = await server.post("/todos", {
        title,
        text: description,
        createdAt: new Date().toLocaleString(),
        status: statusList.length === 0 ? "default" : statusList[0],
        comment: "",
        completed: false,
      });
      setResponse(response);
      setStatusList([]);
    };
    saveTodo();
  };
  return (
    <div className={!addTaskClicked ? "hide" : ""}>
      <TodoForm
        addTaskClicked={addTaskClicked}
        setRefreshList={setRefreshList}
        handleCloseInputFields={handleCloseInputFields}
        onSubmit={handleUpdateTodo}
      ></TodoForm>
    </div>
  );
};

export default CreateTodo;
