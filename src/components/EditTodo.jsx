import React from "react";
import TodoForm from "./TodoForm";
import server from "../api/server";

const EditTodo = ({ todo, setRefreshList, setOpenEdit, openEdit }) => {
  const handleCloseInputFields = () => {
    setOpenEdit(!openEdit);
  };

  const handleUpdateTodo = (
    title,
    description,
    statusList,
    setStatusList,
    setResponse
  ) => {
    const updateTodo = async () => {
      const response = await server.patch(`/todos/${todo.id}`, {
        title,
        text: description,
        status: statusList.length === 0 ? "default" : statusList[0],
      });
      setOpenEdit(false);
      setResponse(response);
      setStatusList([]);
    };
    updateTodo();
  };
  return (
    <div className={!openEdit ? "hide" : ""}>
      <TodoForm
        handleCloseInputFields={handleCloseInputFields}
        addTaskClicked={openEdit}
        setRefreshList={setRefreshList}
        todo={todo}
        setOpenEdit={setOpenEdit}
        onSubmit={handleUpdateTodo}
      ></TodoForm>
    </div>
  );
};

export default EditTodo;
