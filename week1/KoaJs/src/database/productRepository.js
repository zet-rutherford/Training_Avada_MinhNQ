const fs = require("fs");
const { data: products } = require("./products.json");

/**
 *
 * @returns [{id: number, name: string, price: number, desciption: string, product: string, color: string, image: string, createdAt: string}] */
function getAll() {
  return products;
}

/**
 *
 * @param id
 * @returns {id: number, name: string, price: number, desciption: string, product: string, color: string, image: string, createdAt: string}
 */
function getOne(id) {
  return products.find((product) => product.id === parseInt(id));
}
/**
 *
 * @param data
 */
function add(data) {
  const updatedProducts = [data, ...products];
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: updatedProducts,
    })
  );
}
/**
 *
 * @param id
 * @param data
 */
function update(id, data) {
  const updatedIndex = products.findIndex(
    (product) => product.id === parseInt(id)
  );
  products.splice(updatedIndex, 1);
  const updatedProducts = [data, ...products];

  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({ data: updatedProducts })
  );
}
/**
 *
 * @param id
 */
function remove(id) {
  const deletedIndex = products.findIndex(
    (product) => product.id === parseInt(id)
  );
  products.splice(deletedIndex, 1);
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({ data: products })
  );
}
module.exports = {
  getOne,
  getAll,
  add,
  remove,
  update,
};
