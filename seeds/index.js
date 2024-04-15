const mongoose = require("mongoose");
const cities = require("./cities");
const descriptors = require("./descriptors");
const places = require("./places");
const Campground = require("../models/campground");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
  console.log("Database connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6610ed472808ac3120299f02",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Lorem ipsum dolur sit amet.......",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/djma7yuas/image/upload/v1713006609/YelpCamp/trbg2w0sejyzegtq693o.png",
          filename: "YelpCamp/dqntgatcnl4bfsvolnhy",
        },
        {
          url: "https://res.cloudinary.com/djma7yuas/image/upload/v1713007011/YelpCamp/rfxgxqqqgoeqdrivxbum.png",
          filename: "YelpCamp/h3uyrfojcs9ul3pcenq6",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
