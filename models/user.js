var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password : { type: String, select: false },
  isAdmin : String
});



// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
