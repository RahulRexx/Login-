var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {
    mongoose: mongoose
};

// var MONGODB_URI = "mongodb://localhost/Login";

// var prod = true;
// if (prod) {
//     MONGODB_URI = "mongodb+srv://rahuluser:rahulraj@todoapp-kzfjc.mongodb.net/Login?retryWrites=true"
// }


