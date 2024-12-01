var express = require("express");
var router = express.Router();
const db = require("../db/db");

/* GET home page. */
router.get("/", function (req, res, next) {
  const select = db.prepare(`
  SELECT 
        id,
        name,
        price,
        brand,
        image,
        addedDate,
        slug
    FROM products
`);

  try {
    const rows = select.all();

    res.render("index", {
      title: "Freaky fashion",
      products: rows,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);

    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
