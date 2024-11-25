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
            slug,
            sku
        FROM products
    `);    
const products = select.all();
res.json( products );

});

module.exports = router;
