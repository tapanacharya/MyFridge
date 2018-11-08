var mongoose = require('mongoose');
var foo = mongoose.model('Food');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.foodsReadOne = function(req, res) {
    if (req.params && req.params.foodid) {
        foo
            .findById(req.params.foodid)
            .exec(function(err, food){
                if(!food){
                    sendJsonResponse(res, 404, {
                        "message": "foodid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, food);
        });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No foodid in request"
        });
    }
};

/* GET - to display food list */
module.exports.foodsList = function(req, res) {
    foo.find({})
        .exec(function(err, food){
                if(!food){
                    sendJsonResponse(res, 404, {
                        "message": "foodid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, food);
        });

};

/* POST /api/food */
module.exports.foodsCreate = function (req, res) {
    foo.create({
        name: req.body.name,
        date: req.body.date,
        expiry: req.body.expiry,
        left_overs: req.body.left_overs,
        quantity: req.body.quantity        
    }, function(err, food) {
        if(err) {
            sendJsonResponse(res, 404, err);
        } else {
            res.header({
                Food: req.protocol + '://' + req.get('host') + '/api/food/' + food._id
            });
        sendJsonResponse(res, 201, food);
        }
    });
};

module.exports.addItem = function (req, res) {
    foo.create({
        name: req.body.name,
        date: req.body.date,
        expiry: req.body.expiry,
        left_overs: req.body.left_overs,
        quantity: req.body.quantity        
    }, function(err, food) {
        if(err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, food);
        }
    });
};

/* PUT /api/food/:foodid */
module.exports.foodsUpdateOne = function(req, res) {
  if (!req.params.foodid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, foodid is required"
    });
    return;
  }
  foo
    .findById(req.params.foodid)
    .exec(
      function(err, food) {
        if (!food) {
          sendJsonResponse(res, 404, {
            "message": "foodid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        food.name = req.body.name;
        food.date = req.body.date;
        food.expiry = req.body.expiry;
        food.left_overs = req.body.left_overs;
        food.quantity = req.body.quantity;
        food.save(function(err, food) {
          if (err) {
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 200, food);
          }
        });
      }
  );
};

/* DELETE /api/food/:foodid */
module.exports.foodsDelete = function(req, res) {
  var foodid = req.params.foodid;
  var quantity;    
  if (foodid) {
    foo
      .findById(foodid)
      .exec(
        function (err, food) {
            if(err) {
                sendJsonResponse(res, 404, err);
            } else {
                if(food) {
                    if (food.quantity > 1){
                        food.quantity = food.quantity - 1;
                        food.save(function(err,food){
                            if(err){
                                sendJsonResponse(res, 404, err);
                            } else {
                                sendJsonResponse(res, 200, food);
                            }
                        });
                    } else {
                        food.remove({"_id": req.params.id}, function(err, result){
                            if(err){
                                sendJsonResponse(res, 404, err);
                                return;
                            } else {
                                sendJsonResponse(res, 204, null);
                                return;
                            }
                        });
                    }
                }
            }
        });
  } else {
    sendJsonResponse(res, 404, {
      "message": "No foodid"
    });
  }
};
