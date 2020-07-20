var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var {
    User
} = require("./models/users.js");

var MONGODB_URI = "mongodb://localhost/Login";

var prod = true;
if(prod)
{
    MONGODB_URI = "mongodb+srv://rahuluser:rahulraj@todoapp-kzfjc.mongodb.net/Login?retryWrites=true"
}


mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

//======================Express-session=============================== 
app.use(require("express-session")({
    secret: "This is the secret",
    resave: false,
    saveUninitialized: false
}));
//===========================Passport requirement===================================
app.use(passport.initialize());
app.use(passport.session());

//=========================passport==================================
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 
//=================================================================


app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret");
});


app.get("/register", (req, res) => {

    res.render("register");
});


app.post("/register", (req, res) => {
    console.log(req.body.username, req.body.password);
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/secret");
        })

    });
});

app.get("/login", (req, res) => {
    res.render("login");
});


app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {
    console.log("hitted");
});

app.get("/logout", (req, res) => {
    req.logout(); 
    res.redirect("/");
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};


var port = 3000 || process.env.PORT;

app.listen(port, () => {
    console.log("started")
});