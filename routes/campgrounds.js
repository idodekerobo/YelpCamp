var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index"); // if i require a directory it'll automatically require the file named index
// INDEX
router.get("/", function(req, res) {
    // get all campgrounds from db and then render
    Campground.find({}, function(err, allCampgrounds) {
       if(err) {
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds: allCampgrounds}); // data on the right is being passed in. on the left is what we want to call it 
       }
    });
});

// CREATE
// so users can send/post data to the server (post new campgrounds)
// has the same root path as above because it can because its a completely different route (one's a get, one's post)
// also a convention for how we name our routes - REST
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, price: price, description: desc, author: author};
    // create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            // redirect back to campgrounds page - we have two /campground's but when you redirect the default is to redirect to a get request
            res.redirect("/campgrounds");
        }
    });
    
});

// NEW
// show the form that will send data to post route above. form to add new campgrounds
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - show more info about one campground
// this has to follow the RESTFUL routes convention because if its before new, it won't show the form 
router.get("/:id", function(req, res) {
    // find the campground w/ provided ID
    // Campground.findByID(ID, callback)
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground}); // under the name campground, we'll pass in foundCampground
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        // render the edit page
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            res.redirect("/campground");
        } else {
            // redirect somewhere (show page)
            res.redirect("/campgrounds/"+req.params.id); // can also do updatedCampground._id
        }
    });
});


// DESTROY CAMPGROUND
// don't need to write /campgrounds because of the shortcut in app.js
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});




module.exports = router;
