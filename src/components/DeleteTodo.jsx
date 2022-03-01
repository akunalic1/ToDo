import React from "react";
import "./../css/todoDelete.css";
import server from "../api/server";

const DeleteTodo = ({ todo, openDelete, setOpenDelete, setRefreshList }) => {
  const handleDelete = () => {
    const deleteTodo = async () => {
      const response = await server.delete(`/todos/${todo.id}`);
      console.log(response);
    };
    deleteTodo();
    setRefreshList(true);
  };
  return (
    <div
      className={`delete-field glass ${!openDelete ? "hide" : ""} ${
        todo.status
      }-delete-border`}
    >
      <h4>Are you sure you want to delete this item?</h4>
      <div className="buttons-delete-container">
        <button className="delete-yes" onClick={handleDelete}>
          Yes
        </button>
        <button className="delete-no" onClick={(e) => setOpenDelete(false)}>
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteTodo;
