var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    passport: String
});




userSchema.plugin(passportLocalMongoose); 


var User = mongoose.model("Users", userSchema);

module.exports = {
    User
};