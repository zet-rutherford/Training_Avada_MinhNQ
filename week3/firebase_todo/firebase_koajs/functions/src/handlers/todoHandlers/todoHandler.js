const todoRepository = require("../../repositories/todoRepository");

/**
 *
 * @param ctx
 * @returns {Promise<{success:boolean, message:string, todo:{title: string, isCompleted: boolean, createdAt: Date, updatedAt: Date}}| {success:boolean,error:*}>}
 */
const createTodo = async (ctx) => {
  try {
    const data = ctx.req.body;
    const res = await todoRepository.add(data);
    if (res.success === true) {
      return (ctx.body = {
        success: true,
        message: "Create todo success",
        todo: res.todo,
      });
    }
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success:string, message:string, todos:[{title:string, isCompleted: boolean, createdAt: Date, updatedAt:Date}]}|{success:boolean, todos:[],error:*}>}
 */
const getAllTodos = async (ctx) => {
  try {
    const todos = await todoRepository.getAll();
    if (todos) {
      return (ctx.body = {
        success: true,
        message: "Get all todos list",
        todos: todos,
      });
    }
  } catch (error) {
    ctx.body = {
      success: false,
      todos: [],
      error: error.message,
    };
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success:boolean, message:string}|{success:boolean,error:*}>}
 */
const deleteTodo = async (ctx) => {
  try {
    const id = ctx.params.id;
    const res = await todoRepository.remove(id);
    if (res) {
      return (ctx.body = {
        success: true,
        message: "Delete todo success",
      });
    }
    throw new Error("Not found with that id!");
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success:boolean, message:string}|{success:boolean,error:*}>}
 */
const updateTodo = async (ctx) => {
  try {
    const id = ctx.params.id;
    const data = ctx.req.body;
    console.log("data:", data);
    const res = await todoRepository.update({
      id,
      data: { isCompleted: !data.isCompleted },
    });
    if (res) {
      return (ctx.body = {
        success: true,
        message: "Update todo success",
      });
    }
    throw new Error("Not found with that id!");
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success:boolean, message: string} | {success:boolean, error: *}>}
 */
const updateSelectedTodo = async (ctx) => {
  try {
    const data = ctx.req.body;
    const res = await todoRepository.updateSeleted(data);
    if (res) {
      return (ctx.body = {
        success: true,
        message: "Update todo selected success",
      });
    }
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, message: string} | {success:boolean, error:*}>}
 */
const deleteSelectedTodo = async (ctx) => {
  try {
    const data = ctx.req.body;
    const res = await todoRepository.removeSelected(data);
    if (res) {
      return (ctx.body = {
        success: true,
        message: "Delete todo selected success",
      });
    }
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
};

module.exports = {
  getAllTodos,
  deleteTodo,
  updateTodo,
  updateSelectedTodo,
  deleteSelectedTodo,
  createTodo,
};
