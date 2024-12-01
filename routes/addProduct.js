var express = require("express");
var router = express.Router();

const db = require("../db/db");

router.post("/", function (req, res, next) {
  const { name, price, brand, image, sku, description } = req.body;

  if (!name || !price || !brand || !image || !sku || !description) {
    res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const slug = name
      .toLowerCase()
      .replace(" ", "-")
      .replace("/", "")
      .replace(",", "");

    const newProduct = {
      name,
      price,
      brand,
      image,
      sku,
      description,
      addedDate: new Date().toISOString().split("T")[0], 
      slug,
    };

    const insert = db.prepare(
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
        `
    );
    
    insert.run(newProduct);
    res.status(201).end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
