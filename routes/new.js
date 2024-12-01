var express = require("express");
var router = express.Router();

/* GET new product form page. */
router.get("/", function (req, res, next) {
  res.render("new", { title: "new product" });
});

module.exports = router;
