var mongoose = require("mongoose");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
          },
      username: String
   },
   comments: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
       }
    ]
});

// COMPILE INTO DATA MODEL
// var Campground = mongoose.model("Campground", campgroundSchema);

// EXPORT TO APP
module.exports = mongoose.model("Campground", campgroundSchema);
