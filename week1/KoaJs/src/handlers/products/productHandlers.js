const {
  getAll: getAllProducts,
  getOne: getOneProduct,
  add: addProduct,
  remove: removeProduct,
  update: updateProduct,
} = require("../../database/productRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getProducts(ctx) {
  try {
    const { sort, limit, fields } = ctx.query;

    const products = limit
      ? getAllProducts().slice(0, limit)
      : getAllProducts();
    if (sort) {
      sort === "desc"
        ? products.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        : products.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }
    if (fields) {
      console.log(fields);
      fieldArray = fields.split(",");
      const products = products.map((product) => {
        const filterdProduct = {};
        fieldArray.forEach((field) => {
          if (product.hasOwnProperty(field)) {
            filterdProduct[field] = product[field];
          }
        });
        return filterdProduct;
      });
    }
    // ctx.body = {
    //   data: filterdProduct,
    // };
    await ctx.render("pages/getAllProduct", { products });
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
 * @returns {Promise<{data: {name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    console.log(id);
    const currentProduct = getOneProduct(id);
    console.log(currentProduct);
    if (!currentProduct) {
      throw new Error("Product Not Found with that id!");
    }

    await ctx.render("pages/getOneProduct", { currentProduct });
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
    addProduct(postData);

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
    removeProduct(id);
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
    const updatedProduct = ctx.request.body;
    updateProduct(id, updatedProduct);
    console.log(updatedProduct);
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
  getProducts,
  getProduct,
  save,
  remove,
  update,
};
