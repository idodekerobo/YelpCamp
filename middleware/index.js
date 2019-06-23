// ALL MIDDLEWARE GOES HERE
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // CAMPGROUND OWNERHSIP - making a function so our code is DRY
    // is user logged in?
    if(req.isAuthenticated()) {
        // find the campground
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err) {
                req.flash("error", "That campground hasn't been discovered yet!")
                res.redirect("back");
            } 
            else {
                // does user own campground
                // console.log(foundCampground.author.id); // a mongoose object
                //console.log(req.user._id); // a string, so these cannot use ===, need .equals() method
                if(foundCampground.author.id.equals(req.user._id)) {
                    // move on to the code after the middleware
                    next();
                } else {
                    req.flash("You didn't discover this campground so you can't do that!")
                    res.redirect("back");
                }
            }
        });  
    } else {
        req.flash("error", "Momma taught us not to talk to strangers... please login first!");
        // // not logged in so redirect and take user to previous page that they were on
        res.redirect("back");
    }    
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    // CAMPGROUND OWNERHSIP - making a function so our code is DRY
// is user logged in?
    if(req.isAuthenticated()) {
        // find the campground
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                res.redirect("back");
            } 
            else {
                // does user own comment?
                console.log(foundComment);
                if(foundComment.author.id.equals(req.user._id)) {
                    // move on to the code after the middleware
                    next();
                } else {
                    req.flash("error", "You didn't write that comment!")
                    res.redirect("back");
                }
            }
        });  
    } else {
        // not logged in so redirect
        console.log("You need to be logged in to do that");
        // takes user to previous page that they were on
        res.render("login");
    }    
};


// middleware that will check if users are logged in to comment
// you can plug this function anywhere to require users to sign in when browsing the site.
// just put in between the root path and the callback function of the route
middlewareObj.isLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "Momma taught us not to talk to strangers... please login first!");
        res.redirect("/login");
    }
};

module.exports = middlewareObj;
