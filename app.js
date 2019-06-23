// makes a var for each one
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground.js"), // CONNECTING CAMPGROUND DATA MODEL
    Comment     = require("./models/comment.js"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");
    
var     commentRoutes       = require("./routes/comments"),
        campgroundRoutes    = require("./routes/campgrounds"),
        indexRoutes          = require("./routes/index");
    
// mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true }); // connecting to/creating local mongodb database
// mongodb://<user>:<password>@ds121135.mlab.com:21135/yelpcampdatabase // cloud database url
mongoose.connect("mongodb://idode:campgrounds21@ds121135.mlab.com:21135/yelpcampdatabase");

app.use(bodyParser.urlencoded({extended: true})); //using body parser
app.use(express.static(__dirname + "/public")); // linking to public dir, dirname refers to the filepath that the script lives in
// why we don't need .ejs at the end of ejs files
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "packs coming in, send them by the gmail",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// IMPORTANT - passes currentUser variable into every route 
app.use(function(req, res, next) {
   res.locals.currentUser = req.user; // middleware that will run on every route
   res.locals.error = req.flash("error"); // passing in the message var for our flash messages into all routes
   res.locals.success = req.flash("success");
   next(); // function that lets our routes go to the next step (callback func) and not stop halfway
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Serving your YelpCamp app");
});
