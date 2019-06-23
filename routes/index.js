var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

// Root Route
router.get("/", function(req, res) {
    res.render("landing");
});

// ================================================================================================================================
//                                                           AUTH ROUTES  
// ================================================================================================================================

//SHOW REGISTER FORM
router.get("/register", function(req, res) {
    res.render("register");
});
// SIGN UP LOGIC
router.post("/register", function(req, res) {
    // saves the an object containing the username to var newUser
    var newUser = new User({username: req.body.username});
    // lets passport method, .register(), handle the logic that hashes the password
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to YelpCamp "+user.username);
            res.redirect("/campgrounds");
        });
    });
});
//SHOW LOGIN FORM
router.get("/login", function(req, res) {
    res.render("login");
});
//LOGIN LOGIC - app.post("/login", middleware (authenticate method), callback);
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//lOGOUT ROUTE
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("error", "See ya later!"); // add these flash requests in BEFORE we redirect people
   res.redirect("/campgrounds");
});


module.exports = router;
