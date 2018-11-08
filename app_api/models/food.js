var mongoose = require('mongoose');

var foodSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    expiry: Date,
    left_overs: {
        type: Boolean, 
        "Default": false
    },
    quantity: {
        type: Number,
        "Default": 1,
        min: 1 
    }
});

mongoose.model('Food', foodSchema);