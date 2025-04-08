const wrapAsync = require("../utils/warapAsync.js")
const Listing = require("../model/listing.js")
const { uploadImageFile } = require("../cloudConfig.js");


module.exports.createNewlisting = async (req, res, next) => {
    res.render("listing/creatnew.ejs");

}
module.exports.showlisting = wrapAsync(async function (req, res) {
    let { id } = req.params;
    let listings = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listings) {
        req.flash("error", "Listing is not exist!!");
        res.redirect("/alllisting");
    }
    res.render("listing/show.ejs", { listings });
})




module.exports.submitNewCreateListing = wrapAsync(async (req, res) => {
    if (!req.files || req.files.length === 0) {
        req.flash("error", "Failed to upload image");
        return res.redirect("/new");
    }
    // Process uploaded images
    let imageDetails = req.files.map(file => ({
        url: file.path,
        filename: file.filename
    }));
    // Create new listing from request body
    let newListing = new Listing(req.body);
    // Set the owner and images for the new listing, then save it
    newListing.owner = req.user._id;
    newListing.images = imageDetails;
    await newListing.save();

    req.flash("success", "New listing created successfully!");
    res.redirect("/alllisting");
});




module.exports.editListing = wrapAsync(async (req, res) => {
    let { id } = req.params;
    let edit = await Listing.findById(id);
    if (!edit) {
        req.flash("error", "Your request for for edit does not exist!")
        res.redirect("/alllistings")
    }
    let originalImages = edit.images.map(image => ({ url: image.url.replace("/upload", "/upload/h_300,w_250") }));
    edit.images = originalImages
    res.render("listing/edit.ejs", { edit });
})

module.exports.submitEditListing = wrapAsync(async (req, res) => {
    let { id } = req.params;
    if (req.files) {
        console.log("file getting secessfully");
    }

    let newListingImage = req.files.map(image => ({
        url: image.path,
        filename: image.filename
    }))
    // const imageurl = req.files.path;
    // const filename = req.files.filename;
    let { title, description, price, country, location } = req.body;

    const editData = {
        title,
        description,
        price: Number(price),
        country,
        location,
        images: newListingImage
    };
    await Listing.findByIdAndUpdate(id, editData, { new: true });
    req.flash("success", " listing updated !!!");
    res.redirect(`/listings/${id}`)
});


module.exports.destroyListing = wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted !!!");

    res.redirect("/alllisting")
})

