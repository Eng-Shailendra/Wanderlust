if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}



const express = require("express");
const mongooes = require("mongoose");
const path = require("path");
const Listing = require("./model/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/warapAsync.js");
const expressError = require("./utils/expressError.js");
const session = require("express-session");



// router pages
const listingsRouter = require("./routers/listingsRouter.js");
const reviewsRouter = require("./routers/reviewRouter.js");
const userRouter = require("./routers/userRouter.js")

const flash = require('connect-flash');

const passport = require("passport")
const LocalStrategy = require("passport-local");
const User = require("./model/user.js");
const listing = require("./model/listing.js");

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


main().then((err, result) => {
    if (err) throw err;
    console.log("get connetion with databass successfully");
}).catch((err) => {
    console.log("getting some error with connect mongodb ");
})
async function main() {
    await mongooes.connect("mongodb://127.0.0.1:27017/wanderlust");
}


// express-  session ------>
const sessionOption = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
}
app.use(session(sessionOption));
app.use(flash());
// for user otherization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// flash massage middleware;
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.cuUser = req.user;

    next();
})



app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


app.get("/", wrapAsync(async (req, res) => {
    let listings = await Listing.find();
    res.render("listing/index.ejs", { listings });
})
);

// index route
app.get("/alllisting", wrapAsync(async (req, res) => {
    let listings = await Listing.find();
    res.render("listing/index.ejs", { listings });
})
);






// err handling
app.all("*", (req, res, next) => {
    next(new expressError(404, "page not found"));
})

app.use((err, req, res, next) => {
    // theri is can assigne some default value
    console.log(err)
    let { statusCode = 500, message = "internal server error" } = err;
    res.status(statusCode).render("error.ejs", { message })
})


// server strating
app.listen(8080, (req, res) => {
    console.log("the server is start on : 8080");
});