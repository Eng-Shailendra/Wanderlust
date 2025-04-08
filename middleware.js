const Listing = require("./model/listing.js")
const expressError = require("./utils/expressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./model/review.js")

// cheacking is login 
module.exports.isloggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // createing a varriable for path before login user trying to access;
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Please login to create new listing!!");
        return res.redirect("/login");
    }
    next()
}


module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

// authorigation middleware
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.cuUser._id)) {
        req.flash("error", "You don't have permission to edit");
        return res.redirect(`/listings/${id}`)
    }
    next()
}


// joi validation
//joi schema validation middileware
module.exports.validatelisting = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new expressError(statusCode = 400, message = "enter a valid  details and complete the process ");
    } else {
        next();
    }
}


// review
//joi review schema  validation
module.exports.validateReview = (req, res, next) => {
    let { reviewData } = req.body
    let { error } = reviewSchema.validate(reviewData);
    if (error) { throw new expressError(statusCode = 400, message = "enter a valid  details and complete the process "); }
    else { next(); }
}

// to check reviewAuthor
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let listing = await Review.findById(reviewId);
    if (!listing.author._id.equals(res.locals.cuUser._id)) {
        req.flash("error", "You don't have permission to delete this review");
        return res.redirect(`/listings/${id}`)
    }
    next()
}