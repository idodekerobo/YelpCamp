var mongoose = require("mongoose");

// SCHEMA
var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" // the model we refer too
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);
