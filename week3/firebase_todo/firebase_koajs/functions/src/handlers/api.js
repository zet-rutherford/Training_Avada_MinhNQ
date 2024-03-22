const Koa = require("koa");
const koaBody = require("koa-body");
const routes = require("../routes/route");
const path = require("path");
const cors = require("@koa/cors");
const app = new Koa();

// Cấu hình CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Cho phép yêu cầu từ nguồn này
    credentials: true, // Cho phép cookie, authorization headers, etc...
  })
);

// app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

module.exports = app;
