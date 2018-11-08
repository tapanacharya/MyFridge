var express = require('express');
var router = express.Router();
var ctrlFood = require('../controllers/food');

/* GET home page. */
router.get('/', ctrlFood.foodItemList);
router.get('/food/additem', ctrlFood.foodAddItem);
router.post('/food/additem', ctrlFood.AddItem);

module.exports = router;
