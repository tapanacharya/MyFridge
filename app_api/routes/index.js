var express = require('express');
var router = express.Router();
var ctrlFoods = require('../controllers/food');

/* Foods */
router.get('/food/:foodid', ctrlFoods.foodsReadOne);
router.get('/food', ctrlFoods.foodsList);
router.post('/food', ctrlFoods.foodsCreate);
router.post('/food/additem', ctrlFoods.addItem);
router.put('/food/:foodid', ctrlFoods.foodsUpdateOne);
router.delete('/food/:foodid', ctrlFoods.foodsDelete);

module.exports = router;
