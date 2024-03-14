import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ todo, toggleComplete, removeTodo }) => {
  return (
    <div className="Todo">
      <p
        className={`${todo.isCompleted ? "completed" : "incompleted"}`}
        onClick={() => toggleComplete(todo)}
      >
        {todo.task}
      </p>
      <div>
        <FontAwesomeIcon icon={faTrash} onClick={() => removeTodo(todo)} />
      </div>
    </div>
  );
};
