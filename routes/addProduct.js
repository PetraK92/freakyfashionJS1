var express = require("express");
var router = express.Router();

const db = require("../db/db");

/* GET home page. */
router.post("/", function (req, res, next) {
  //     const select = db.prepare(`
  //         SELECT
  //             id,
  //             name,
  //             price,
  //             brand,
  //             image,
  //             addedDate,
  //             slug
  //         FROM products
  //     `);
  // const products = select.all();
  // res.json( products );
 
  
  
// TODO lägga till addProductsroutern i app.js
// TODO testa att routern fungerar 
const { name, price, brand, image, sku, description } = req.body;
console.log(name, price, brand, image, sku, description);
  if (!name || !price || !brand || !image || !sku || !description) {
    res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const slug = name
      .toLowerCase()
      .replace(" ", "-")
      .replace("/", "")
      .replace(",", "");
      console.log("slug" , slug);
      const newProduct={
        name,
        price,
        brand,
        image,
        sku,
        description,
        addedDate: new Date().toISOString(),
        slug
      }
      console.log(newProduct)
    const insert =
      db.prepare(
        `INSERT INTO products (
        name, 
        price, 
        brand, 
        image, 
        sku, 
        description, 
        addedDate, 
        slug)
        VALUES(
        @name, 
        @price, 
        @brand, 
        @image, 
        @sku, 
        @description, 
        @addedDate, 
        @slug)
        `);
        console.log("insert" , insert);
    insert.run(newProduct);
    res.status(201).end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
