const fs = require("fs");
const { data: todos } = require("./todos.json");

/**
 *
 * @returns [{id: number, task:string, isCompleted:boolean}] */
function getAll() {
  return todos;
}

/**
 *
 * @param id
 * @returns {id: number, task:string, isCompleted:boolean}
 */
function getOne(id) {
  return todos.find((todo) => todo.id === parseInt(id));
}
/**
 *
 * @param data
 */
function add(data) {
  const updatedTodos = [data, ...todos];
  fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({
      data: updatedTodos,
    })
  );
  return data;
}
/**
 *
 * @param id
 * @param data
 */
function update(id) {
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, isCompleted: true };
    }
    return todo;
  });

  return fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({ data: updatedTodos })
  );
}
/**
 *
 * @param id
 */
function remove(id) {
  const remainingTodos = todos.filter((todo) => todo.id !== id);
  console.log(remainingTodos);
  return fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({ data: remainingTodos })
  );
}

function removeTodos(ids) {
  const remainingTodos = todos.filter((todo) => !ids.includes(todo.id));
  console.log(remainingTodos);
  return fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({ data: remainingTodos })
  );
}

function updateTodos(ids) {
  const updatedTodos = todos.map((todo) => {
    if (ids.includes(todo.id)) {
      return { ...todo, isCompleted: true };
    }
    return todo;
  });
  console.log(updateTodos);
  return fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({ data: updatedTodos })
  );
}
module.exports = {
  getOne,
  getAll,
  add,
  remove,
  update,
  removeTodos,
  updateTodos,
};
