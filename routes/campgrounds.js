const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds.js");
const catchAsync = require("../utilities/catchAsync");
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
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

router.get("/campgrounds");

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
