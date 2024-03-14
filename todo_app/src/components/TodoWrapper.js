import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";

import {
  createNewTodo,
  deleteTodo,
  getTodo,
  updateCurrentTodo,
} from "../services/todoService";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [fetching, setFetching] = useState(false);

  const addTodo = async (task) => {
    try {
      let newTodo = {
        id: uuidv4(),
        task,
        isCompleted: false,
      };
      const res = await createNewTodo(newTodo);
      console.log("check res:", res);
      if (res && res.success === true) {
        // setFetching(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = (todo) => {
    const { id } = todo;
    deleteTodo(id);
    setFetching(true);
  };

  const getTodos = async () => {
    try {
      const res = await getTodo();
      if (res) {
        setTodos(res.data);
      }
    } catch (error) {
      console.error("Error with message ", error.message);
      throw error;
    }
  };

  const toggleComplete = (todo) => {
    const { id } = todo;
    console.log(todo);
    updateCurrentTodo(id, { id: todo.id, task: todo.task, isCompleted: true });
    setFetching(true);
  };

  useEffect(() => {
    getTodos();
  }, [fetching]);
  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos &&
        todos.length > 0 &&
        todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
          />
        ))}
    </div>
  );
};
