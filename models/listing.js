const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
   type: String,
    default:"https://unsplash.com/photos/person-in-swimming-pool-during-daytime-rlwE8f8anOc",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/person-in-swimming-pool-during-daytime-rlwE8f8anOc"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;