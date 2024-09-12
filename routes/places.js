const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const isValidObjectId = require('../middlewares/isValidObjectID');
const isAuthOut = require("../middlewares/isAuthOut");
const {isAuthorPlace} = require('../middlewares/isAuthor');
const PlaceController = require('../controllers/places');
const { validationPlace } = require("../middlewares/validator");
const upload = require("../config/multer");


const router = express.Router();

// Middleware validation

router.route('/')
    .get(wrapAsync(PlaceController.index))
    .post(isAuthOut,upload.array('image', 5),validationPlace,wrapAsync(PlaceController.createPost));
    

router.get("/create",isAuthOut, (PlaceController.viewCreate));

router.route('/:id')
.get(isValidObjectId(`/places`),wrapAsync(PlaceController.view))
.put(isAuthOut,isAuthorPlace,isValidObjectId('/places'),upload.array('image', 5),validationPlace,wrapAsync(PlaceController.update))
.delete(isAuthOut,isAuthorPlace,isValidObjectId('/places'),wrapAsync(PlaceController.delete));


router.get("/:id/edit",isAuthOut,isAuthorPlace,isValidObjectId(`/places`),wrapAsync(PlaceController.viewEdit));

router.delete('/:id/images',isAuthOut,isAuthorPlace,isValidObjectId('/places'),wrapAsync(PlaceController.deleteImage));




module.exports = router;
