import React, { useState, useEffect } from "react";
import server from "../api/server";
import Todo from "./Todo";

const TodoList = () => {
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await server.get("/todos");

      if (response.status === 200) setAllTodos(response.data);
      console.log(response);
    };
    fetchTodos();
  }, []);

  return (
    <div>
      {allTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
