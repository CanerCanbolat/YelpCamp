const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const campground = require("../controllers/campgrounds.js");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../middleware.js");

router
  .route("/")
  .get(catchAsync(campground.index))
  .post(
    isLoggedIn,
    upload.array("campground[image]"),
    validateCampground,
    catchAsync(campground.createCampground)
  );

router.get("/campgrounds");

router.get("/new", isLoggedIn, campground.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campground.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campground.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campground.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campground.renderEditForm)
);

module.exports = router;
