import axios from "../config/configAxios";

const getTodo = async () => {
  return await axios.get(`todos`);
};

const createNewTodo = (userData) => {
  return axios.post("todos", { ...userData });
};

const updateCurrentTodo = (id, data) => {
  return axios.put(`todos/${id}`, data);
};

const deleteTodo = async (id) => {
  return axios.delete(`todos/${id}`);
};

export { getTodo, createNewTodo, deleteTodo, updateCurrentTodo };
