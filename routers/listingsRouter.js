const express = require("express");
const router = express.Router();
const { isloggedIn, isOwner, validatelisting } = require("../middleware.js");
const multer = require("multer");
const storage = require("../cloudConfig.js");
const upload = multer(storage);
const listingController = require("../controllers/listingController.js")


router
    .route("/new")
    .get(
        isloggedIn,             // create new route
        listingController.createNewlisting)
    .post(           // Submit to new creation to database
        isloggedIn,
        upload.array("images", 10),
        validatelisting,
        listingController.submitNewCreateListing,
    );

// edit route
router
    .route("/:id/edit")
    .get(
        isloggedIn,
        isOwner,
        listingController.editListing)
    .put(isloggedIn,
        isOwner,
        upload.array("images", 10),
        validatelisting,
        listingController.submitEditListing);

// delete route(data);
router.get("/:id/delete", isloggedIn, isOwner, listingController.destroyListing);
// show route
router
    .route("/:id")
    .get(listingController.showlisting);


module.exports = router;