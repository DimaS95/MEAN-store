var mongoose = require('mongoose');


// define the schema for our user model


// create the model for users and expose it to our app


module.exports = mongoose.model('Product', {
	user_id:  String,
	name : String,
	price : Number
});