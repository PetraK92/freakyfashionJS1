var express = require('express');
var router = express.Router();
// const products =  require('../api.js');
const db = require("../db/db");

// // lagt till själv
// const Database = require('sqlite3');
// const db = new Database('./db/freakyfashion.db', { verbose: console.log });


/* GET home page. */
router.get('/', function(req, res, next) {

const sql =`
  SELECT name,
        price,
        brand,
        image,
        addedDate,
        slug
    FROM products
`;

db.all(sql, [], function(error, rows) {
  console.log("rows", rows);
  res.render('index', { 
    title: 'Freaky fashion', 
    products: rows
  });
});

});

module.exports = router;
