var express = require("express");
var router = express.Router({mergeParams: true}); // merges the params from the campground and the comments together so inside the comments route we can access campground id
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/");
// =====================================================
//                   COMMENTS ROUTES
// =====================================================
// Comments New
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //find campground by ID and send it through when we render, or it'll show as undefined
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground}); // pass in campground so it knows what that var means in the ejs file when using campground.name, campground._id
        }
    });
    
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res) {
   // lookup campground using ID
   Campground.findById(req.params.id, function(err, campground) {
      if(err) {
          console.log(err);
          res.redirect("/campgrounds");
      } else {
        //   console.log(req.body.comment);
          // create new comment
          Comment.create(req.body.comment, function(err, comment) {
              if(err) {
                  req.flash("error", "Oops, something went wrong!");
                  console.log(err);
              } else {
                  // add username and id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.save();
                  // associate the comment to the campground by connecting to the campground we just found by Id
                  campground.comments.push(comment);
                  // save to the database
                  campground.save();
                  console.log(comment);
                  req.flash("success", "Successfully added comment!");
                  // redirect to campground show page
                  res.redirect("/campgrounds/" + campground._id);
              }
          });
          
      }
   });
});


// COMMENTS EDIT ROUTES
// route we're defining /campgrounds/:id/comments/:comment_id/edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});


// COMMENTS DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment succesfully removed!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});



module.exports = router;
