var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('error-page', {
    title : title,
    content : content
  });
};

var renderHomepage = function(req, res, responseBody){
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "Currently, No food item in my fridge! I will have to go for the Grocery shopping..";
    }
  }
  res.render('food-list', {
    title: 'My Fridge',
    pageHeader: {
      title: 'Lets see food items in my fridge'
    },
    foods: responseBody,
    message: message
  });
};

/* GET 'home-Food Item' page */
module.exports.foodItemList = function(req, res){
  var requestOptions, path;
  path = '/api/food';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderHomepage(req, res, body);
    }
  );
};

var renderAddItemPage = function(req, res){
    res.render('food-add-item', {
        title: 'Add Items', 
        pageHeader: {title: 'Add your Fridge items here:'},
        error: req.query.err
    });
};

/* GET Add Food item list */
module.exports.foodAddItem = function(req, res){
    renderAddItemPage(req, res);
};

/* POST 'Add Item' page */
module.exports.AddItem = function(req, res){
 console.log(req.body);
  var requestOptions, path, foodid, postdata;
  foodid = req.params.foodid;
  path = "/api/food/additem";
  postdata = {
    name: req.body.name,
    date: req.body.date,
    expiry: req.body.expiry,
    left_overs: req.body.left_overs,  
    quantity: req.body.quantity
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  request(
      requestOptions,
      function(err, response, body) {
          if (response.statusCode === 201) {
              res.redirect('/');
          } else {
              _showError(req, res, response.statusCode);
          }
      });
};