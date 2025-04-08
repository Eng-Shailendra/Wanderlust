const mongoose = require("mongoose");
const Review = require("./review.js");

const { type } = require("../schema");
const Schema = mongoose.Schema;

let listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },

    images: [{
        url: String,
        filename: String
    }],
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },


});


listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({
            _id: { $in: listing.reviews }
        });
    }
});


const listing = mongoose.model("listing", listingSchema);

module.exports = listing;


