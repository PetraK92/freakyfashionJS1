var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// const db = require("../db/db");

// // // lagt till själv
// const Database = require('better-sqlite3');
// const db = new Database('./db/freakyfashion.db', { 
//   fileMustExist: true,
//   verbose: console.log });


// import routes
var indexRouter = require('./routes/index');
const adminRouter  = require('./routes/admin');
const productsRouter =  require('./routes/products');
const newRouter =   require('./routes/new');
const loadProductsRouter = require('./routes/loadProducts');
const addProductRouter = require('./routes/addProduct');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route entrypoints
app.use('/', indexRouter);
app.use('/admin/products', adminRouter);
app.use('/products',  productsRouter);
app.use('/admin/products/new',  newRouter);
app.use('/admin/products/loadProducts', loadProductsRouter);
app.use('/admin/products/addProduct', addProductRouter)

// // lagt till själv
// // GET /api/students
// // web API-endpoint för att plocka ut information om
// // studerande i JSON-format.
// app.get('/products:id', function (req, res) {
// });
// });

//   // Vi vill hämta detta från databasen
// const id = req.params.id;

// const row = db.prepare(`
//         SELECT 
//             id,
//             name,
//             price,
//             brand,
//             image,
//             slug,
//             addedDate
//         FROM products
//       `);

//   const rows = statement.all();

//   res.json(rows);
// });
// // fram till hit

// från chatgpt
app.get('/products', (req, res) => {
  const rows = db.prepare(`
      SELECT 
          id,
          name,
          price,
          brand,
          image,
          slug,
          addedDate
      FROM products
  `).all(); // Hämtar alla produkter

  res.json(rows); // Returnerar resultaten som JSON
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
