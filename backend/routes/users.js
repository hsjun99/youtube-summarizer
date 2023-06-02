var express = require('express');
var validator = require('express-validator');
var router = express.Router();

/* GET users listing. */
router.get('/', validator.query('name').isLength({ min: 1 }), function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
