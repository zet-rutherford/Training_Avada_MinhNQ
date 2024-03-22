const Router = require("koa-router");
const todoHandlers = require("../handlers/todoHandlers/todoHandler");
const { todoInputMiddleware } = require("../middlewares/todoInputMiddlewares");

const router = new Router({
  prefix: "/api",
});

//todo Route
router.get("/todos", todoHandlers.getAllTodos);
router.post("/todos", todoHandlers.createTodo);
router.delete("/todos/:id", todoHandlers.deleteTodo);
router.post("/todos/remove", todoHandlers.deleteSelectedTodo);
router.put("/todos/:id", todoHandlers.updateTodo);
router.post("/todos/update", todoHandlers.updateSelectedTodo);

module.exports = router;
