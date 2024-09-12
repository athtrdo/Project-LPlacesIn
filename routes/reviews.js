const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const isValidObjectId = require('../middlewares/isValidObjectID');
const isAuthOut = require("../middlewares/isAuthOut");
const {isAuthorReview} = require('../middlewares/isAuthor')
const ReviewController = require('../controllers/reviews');
const { validationReview } = require("../middlewares/validator");


const router = express.Router({mergeParams: true});

//validation middleware

router.post("/",isAuthOut,isValidObjectId('/places'),validationReview,wrapAsync(ReviewController.postReview)
);

router.delete("/:review_id",isAuthOut,isAuthorReview,isValidObjectId('/places'),wrapAsync(ReviewController.delete)
);

module.exports = router;
