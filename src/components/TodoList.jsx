import React, { useState, useEffect } from "react";
import server from "../api/server";
import Todo from "./Todo";
import "./../css/todoList.css";

const TodoList = ({ filter }) => {
  const [allTodos, setAllTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await server.get("/todos");

      if (response.status === 200) {
        setAllTodos(response.data);
        setFilteredTodos(response.data);
      }
      console.log(response);
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    switch (filter) {
      case "all":
        setFilteredTodos(allTodos);
        break;
      case "completed":
        setFilteredTodos(allTodos.filter((todo) => todo.completed));
        break;
      case "not-completed":
        setFilteredTodos(allTodos.filter((todo) => !todo.completed));
        break;
      default:
        setFilteredTodos(allTodos.filter((todo) => todo.status === filter));
    }
  }, [filter]);

  return (
    <div className="todo-list glass">
      {filteredTodos
        ? filteredTodos.map((todo) => <Todo key={todo.id} todo={todo} />)
        : null}
    </div>
  );
};

export default TodoList;
