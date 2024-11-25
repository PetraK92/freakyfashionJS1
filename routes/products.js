var express = require("express");
var router = express.Router();

const db = require("../db/db");

// // Takes an array of products and a product id and returns 3 random and unique products.
function getSimilarProducts(products, currentProductId) {
   let similarProducts = [];
   for (let i = 0; i < 3; i++) {
     let randomIndex = Math.floor(Math.random() * products.length);
     // check if the random product is the same as the current product or if it already exists in the similarProducts array
     if (
       currentProductId == products[randomIndex]?.id ||
       similarProducts.some(
         (product) => product.id === products[randomIndex]?.id
       )
     ) {
       // if it is, decrement the counter and continue to the next iteration
       i--;
       continue;
     }
     // if the product is unique, add it to the similarProducts array
     similarProducts.push(products[randomIndex]);
   }
   // return the array of similar products
   return similarProducts;
 }

//chatgpt
// function getRandomProducts(products, count) {
//   const shuffled = [...products].sort(() => 0.5 - Math.random()); // Slumpa ordningen
//   return shuffled.slice(0, count); // Returnera önskat antal produkter
// }

/* GET product page. */
router.get("/:slug", function (req, res, next) {
  const slug = req.params.slug;
  console.log(slug);

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

      // Kör SQL-frågan och hämta resultaten synkront
  try {
    const rows = select.all();
    const product = rows.find((row) => row.slug === slug);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    const similarProducts = getSimilarProducts(rows, product.id);
    // const randomProducts = getRandomProducts(rows, 3); //chatgpt
    // console.log(similarProducts);

    res.render("details", {
      title: product.name,
      product,
      similarProducts,
      // randomProducts
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);

    // Hantera fel, t.ex. visa en felmeddelande-sida eller skicka ett 500-svar
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
