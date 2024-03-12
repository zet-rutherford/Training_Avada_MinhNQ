const Router = require("koa-router");
const bookHandler = require("../handlers/books/bookHandlers");
const bookInputMiddleware = require("../middleware/bookInputMiddleware");
const productHandler = require("../handlers/products/productHandlers");
const {
  productInputMiddleware,
  productUpdateMiddleware,
} = require("../middleware/productInputMiddleware");

// Prefix all routes with /books
const router = new Router({
  prefix: "/api",
});

// Books Route
router.get("/books", bookHandler.getBooks);
router.get("/books/:id", bookHandler.getBook);
router.post("/books", bookInputMiddleware, bookHandler.save);

//Product Route
router.get("/products", productHandler.getProducts);
router.get("/products/:id", productHandler.getProduct);
router.post("/products", productInputMiddleware, productHandler.save);
router.delete("/products/:id", productHandler.remove);
router.put("/products/:id", productUpdateMiddleware, productHandler.update);
module.exports = router;
