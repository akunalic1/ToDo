import React, { useState, useEffect } from "react";
import server from "../api/server";
import Todo from "./Todo";
import "./../css/todoList.css";

const sortList = (todos) => {
  return todos.sort((a, b) => {
    return a.completed - b.completed;
  });
};

const TodoList = ({
  collection,
  filter,
  refreshList,
  setRefreshList,
  setNumberOfDone,
  setTotalNumber,
}) => {
  const [allTodos, setAllTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await server.get(
        `/todos?collection=${collection.id}&_sort=createdAt&_order=desc`
      );

      if (response.status === 200) {
        setTotalNumber(response.data.length);
        setNumberOfDone(response.data.filter((x) => x.completed).length);
        setAllTodos(sortList(response.data));
        setFilteredTodos(response.data);
      }
    };
    fetchTodos();
    setRefreshList(false);
  }, [refreshList, collection]);

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
  }, [filter, allTodos]);

  useEffect(() => {
    setRefreshList(false);
  }, [filteredTodos]);

  return (
    <div className="todo-list glass">
      {filteredTodos
        ? filteredTodos.map((todo) => (
            <Todo
              setRefreshList={setRefreshList}
              refreshList={refreshList}
              key={todo.id}
              todo={todo}
            />
          ))
        : null}
    </div>
  );
};

export default TodoList;
