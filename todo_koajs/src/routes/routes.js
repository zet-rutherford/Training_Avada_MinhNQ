const Router = require("koa-router");
const todoHandlers = require("../handlers/todoHandlers");
const {
  todoInputMiddleware,
  todoUpdateMiddleware,
} = require("../middlewares/todoInputMiddlewares");

const router = new Router({
  prefix: "/api",
});

//todo Route
router.get("/todos", todoHandlers.getTodos);
router.get("/todos/:id", todoHandlers.getTodo);
router.post("/todos", todoInputMiddleware, todoHandlers.save);
router.delete("/todos/:id", todoHandlers.remove);
router.put("/todos/:id", todoUpdateMiddleware, todoHandlers.update);
module.exports = router;
