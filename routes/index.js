var express = require("express");
var router = express.Router();
// const products =  require('../api.js');
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
  // Kör SQL-frågan och hämta resultaten
  const rows = select.all();

  // Rendera sidan med produkterna
  res.render("index", {
    title: "Freaky fashion",
    products: rows,
  });
} catch (error) {
  console.error("Error fetching products:", error.message);

  // Hantera fel, t.ex. visa en felmeddelande-sida eller skicka ett 500-svar
  res.status(500).send("Internal Server Error");
}
});

module.exports = router;
