const {
  getAll: getAllTodos,
  getOne: getOneTodo,
  add: addTodo,
  remove: removeTodo,
  update: updateTodo,
} = require("../database/todoRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getTodos(ctx) {
  try {
    const { sort, limit } = ctx.query;

    const todos = limit ? getAllTodos().slice(0, limit) : getAllTodos();
    if (sort) {
      sort === "desc"
        ? todos.sort((a, b) => b.id.localeCompare(a.id))
        : todos.sort((a, b) => a.id.localeCompare(b.id));
    }

    ctx.body = {
      data: todos,
    };
    //   await ctx.render("pages/getAlltodo", { todos });
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}
/**
 *
 * @param ctx
 * @returns {Promise<{data: {name: string, price: number, description: string, todo: string, color: string, createdAt: string, image: string}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function getTodo(ctx) {
  try {
    const { id } = ctx.params;
    console.log(id);
    const currentTodo = getOneTodo(id);
    console.log(currentTodo);
    if (!currentTodo) {
      throw new Error("todo Not Found with that id!");
    }
    ctx.body = {
      data: currentTodo,
    };
    //   await ctx.render("pages/getOnetodo", { currenttodo });
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function save(ctx) {
  try {
    const postData = ctx.request.body;
    addTodo(postData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function remove(ctx) {
  try {
    const { id } = ctx.params;
    removeTodo(id);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}
async function update(ctx) {
  try {
    const { id } = ctx.params;
    const updatedTodo = ctx.request.body;
    updateTodo(id, updatedTodo);
    console.log(updatedTodo);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}
module.exports = {
  getTodos,
  getTodo,
  save,
  remove,
  update,
};
