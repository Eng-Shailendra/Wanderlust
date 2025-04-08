const Review = require("../model/review.js");
const wrapAsync = require("../utils/warapAsync.js");
const Listing = require("../model/listing.js");

module.exports.addreview = wrapAsync(async function (req, res) {
    let listing = await Listing.findById(req.params.id)
    let newreview = new Review(req.body);
    newreview.author = req.user._id
    console.log(newreview.author)
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    req.flash("success", "New review created successfuly!!!");
    res.redirect(`/listings/${listing._id}`);

});

module.exports.destroyReview = wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    console.log(req.params);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", " Review deleted successfuly!!!");
    res.redirect(`/listings/${id}`);

});