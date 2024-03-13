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
  return fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({
      data: updatedTodos,
    })
  );
}
/**
 *
 * @param id
 * @param data
 */
function update(id, data) {
  const updatedIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  todos.splice(updatedIndex, 1);
  const updatedTodos = [data, ...todos];

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
  const deletedIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  todos.splice(deletedIndex, 1);
  return fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify({ data: todos })
  );
}
module.exports = {
  getOne,
  getAll,
  add,
  remove,
  update,
};
