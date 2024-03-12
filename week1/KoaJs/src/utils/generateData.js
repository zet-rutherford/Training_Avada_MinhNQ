const { faker } = require("@faker-js/faker");
const fs = require("fs");

function createRandomProduct(id) {
  return {
    id,
    name: faker.commerce.productName(),
    price: faker.number.float({ min: 5, max: 1000, fractionDigits: 2 }),
    desciption: faker.commerce.productDescription(),
    product: faker.commerce.product(),
    color: faker.vehicle.color(),
    image: faker.image.url(),
    createdAt: faker.date.past().toISOString(),
  };
}

let productsList = [];
for (let i = 1; i <= 1000; i++) {
  const books = createRandomProduct(i);
  productsList.push(books);
}
console.log(__dirname);
fs.writeFileSync(
  "/media/minh/01DA153C93C8EA90/WORK/Training_Avada/week1/KoaJs/src/database/products.json",
  JSON.stringify({ data: productsList })
);
