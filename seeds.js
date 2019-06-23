var mongoose = require("mongoose");
var Campground  = require("./models/campground.js"); // CONNECTING CAMPGROUND DATA MODEL
var Comment = require("./models/comment.js"); // CONNECTING COMMENT DATA MODEL

var data = [
        {
            name: "Cloud's Rest",
            image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
            description:"Throw me in the fire, baby, I'll survive Coming top down by the seaside, Ay-yi-yi-yi-yah, ay-yi-yi-yi-yah, See the wrong side of the 45, Only you and me by the borderline (ooo), Ay-yi-yi-yi-yah (ooo-ooo), ay-yi-yi-yi-yah, Let it go, Ridin' on the roof with a dollar sign attached to my, Head, head, head, head, head, head, head, head, Ridin' on the roof with a dollar sign attached to my, Head, head, head, head, head, head, head, head, (Ride slow, ride slow, slow), Ridin' on the roof with a dollar sign attached to my, Head, head, head, head, head, head, head, head (woo, slow), (Ride slow, ride slow, slow), Ridin' on the roof with a dollar sign attached to my, Head, head, head, head, head, head, head, head (woo, slow)"
        },
        {
            name: "Starry Night", 
            image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60", 
            description:"Throw me in the fire, baby, I'll survive Coming top down by the seaside, Ay-yi-yi-yi-yah, ay-yi-yi-yi-yah, See the wrong side of the 45, Only you and me by the borderline (ooo), Ay-yi-yi-yi-yah (ooo-ooo), ay-yi-yi-yi-yah, Let it go, Ridin' on the roof with a dollar sign attached to my, Head, head, head, head, head, head, head, head, Ridin' on the roof with a dollar sign attached to my, Head, head, head, head, head, head, head, head, (Ride slow, ride slow, slow), Ridin' on the roof with a dollar sign attached to my, Head, head, head, head, head, head, head, head (woo, slow), (Ride slow, ride slow, slow), Ridin' on the roof with a dollar sign attached to my, Head, head, head, head, head, head, head, head (woo, slow)"
        },
        {
            name: "Mountain Peak", 
            image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60", 
            description:"Throw me in the fire, baby, I'll survive Coming top down by the seaside, Ay-yi-yi-yi-yah, ay-yi-yi-yi-yah, See the wrong side of the 45, Only you and me by the borderline (ooo), Ay-yi-yi-yi-yah (ooo-ooo), ay-yi-yi-yi-yah, Let it go, Ridin' on the roof with a dollar sign attached to my, Head, head, head, head, head, head, head, head, Ridin' on the roof with a dollar sign attached to my, Head, head, head, head, head, head, head, head, (Ride slow, ride slow, slow), Ridin' on the roof with a dollar sign attached to my, Head, head, head, head, head, head, head, head (woo, slow), (Ride slow, ride slow, slow), Ridin' on the roof with a dollar sign attached to my, Head, head, head, head, head, head, head, head (woo, slow)"
        }
];

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
    console.log("removed campgrounds!");
    // add a few campgrounds, moved inside the callback to guarantee it runs after the data is removed
    // data.forEach(function(campgrounds) {
    //     Campground.create(campgrounds, function(err, campground) {
    //         if(err) {
    //             console.log(err);
    //         } else {
    //             console.log("added a campground");
    //             // create a comment
    //             Comment.create({
    //                 text:"This is great but I wish there was internet",
    //                 author: "John"
    //                 }, function(err, comment) {
    //                     if(err) {
    //                         console.log(err);
    //                     } else{
    //                         campground.comments.push(comment);
    //                         campground.save();
    //                         console.log("Created new comment");
    //                     }
    //             });
    //         }
    //     });
    // });
    });
    // add a few comments
}

module.exports = seedDB;
