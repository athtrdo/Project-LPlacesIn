const Place = require("../models/place");
const fs = require('fs');
const {geoJSON} = require("../utils/hereMaps");
const ExpressError = require("../utils/ErrorHandler");


module.exports.index = async (req, res) => {
  const places = await Place.find();
  const clusteringPlaces = places.map(place => {
    return{ 
      latitude: place.geoJSON.coordinates[0],
      longitude: place.geoJSON.coordinates[1]
    }
  })
  const clusteredPlaces = JSON.stringify(clusteringPlaces)
  res.render('places/index.ejs', {places, clusteredPlaces});
};

module.exports.viewCreate = (req, res, next) => {
  res.render("places/create.ejs");
};

module.exports.createPost = async (req, res, next) => {
  const images = req.files.map(file => ({
    url: file.path,
    filename: file.filename
  }))

  const geoData = await geoJSON(req.body.place.location)

  const place = new Place(req.body.place);
  place.author = req.user._id;
  place.images = images;
  place.geoJSON = geoData

  await place.save();

  req.flash("success_msg", "Place added successfully");
  res.redirect("/places");
};

module.exports.view = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");

  res.render("places/show.ejs", { place });
};

module.exports.viewEdit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);
    res.render("places/edit.ejs", { place });
  } catch (error) {
    next(error);
  }
};

module.exports.update = async (req, res,) => {
  const {place} = req.body;
  const { id } = req.params;
  const geoData = await geoJSON(place.location)
  const newPlace = await Place.findByIdAndUpdate(id, { ...place, geoJSON: geoData });

  if(req.files && req.files.length > 0){

    newPlace.images.forEach(image => {
      fs.unlink(image.url, err => new ExpressError)
    });

    const images = req.files.map(file => ({
      url: file.path,
      filename: file.filename
    }))

  newPlace.images = images;
  newPlace.geoJSON = geoData

  await newPlace.save();
}
  req.flash("success_msg", "Place updated successfully");
  res.redirect(`/places/${id}`);
};

module.exports.delete = async (req, res, next) => {
  const { id } = req.params;
  const place = await Place.findById(id);

  if(place.images.length > 0){
    place.images.forEach(image => {
      fs.unlink(image.url, err => new ExpressError)
    });
  }

  await place.deleteOne()
  req.flash("success_msg", "Place deleted successfully");
  res.redirect("/places");
};

module.exports.deleteImage = async (req, res, next) => {

  try {
    const { id } = req.params;
    const {images} = req.body;
    const place = await Place.findById(id);

    if(!images || images.length === 0){
      req.flash('error_msg', 'Please select at least one image');
      return res.redirect(`/places/${id}/edit`)
    }
    images.forEach(image =>{
      fs.unlinkSync(image)
    });

    await Place.findByIdAndUpdate(
      id,
      {$pull: { images: {url: {$in: images}}}}

    );
    req.flash("success_msg", "Place deleted successfully");
    return res.redirect(`/places/${id}/edit`)
    
}catch (err) {
    console.error(err);
    req.flash("error_msg", "Failed to delete images");
    return res.redirect(`/places/${id}/edit`)
    }
  };
