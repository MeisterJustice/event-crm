import Event from '../models/event';
import Blog from '../models/blog';
import cloudinary from 'cloudinary';
import cloudinaryAuth from '../config/auth';

// cloudinary configuration
cloudinary.config({
    cloud_name: cloudinaryAuth.cloudinaryUpload.cloud_name,
    api_key: cloudinaryAuth.cloudinaryUpload.api_key,
    api_secret: cloudinaryAuth.cloudinaryUpload.api_secret
})

export const getEvent = async(req, res, next) => {
    let findEvent = await Event.find({});
    res.render("event/index", {findEvent});
  }

  export const getCreateEvent = async(req, res, next) => {
    res.render("event/new")
}

export const postEvent = async(req, res, next) => {
    let title = await req.body.title;
    let description = await req.body.description;
    let city = await req.body.city;
    let venue = await req.body.venue;
    let mainImage = await req.body.mainImage;
    let author = await {
        id: req.user._id,
        username: req.user.username
    }
    
    req.body.images = [];
    let images = await req.body.images;
    for(const file of req.files) {
        let image = await cloudinary.v2.uploader.upload(file.path);
        images.push({
            url: image.secure_url,
            public_id: image.public_id
        });
    }

    let event = {title: title, description: description, city: city, venue: venue, mainImage: mainImage, images: images, author: author};
    

    let createEvent = Event.create(event, {new: true});
    res.redirect("/event");
}

export const showEvent = async(req, res, next) => {
    let latestBlog = await Blog.find({});
    let event = await Event.findById(req.params.id).populate('comments').exec();
    res.render("event/show", {event, latestBlog})
}

export const getEdit = async(req, res, next) => {
    let showEdit = await Event.findById(req.params.id);
    res.render("event/edit", {showEdit})
}

export const putEvent = async(req, res, next) => {
    let event = await Event.findById(req.params.id);
		if(req.body.deleteImages && req.body.deleteImages.length) {			
			let deleteImages = req.body.deleteImages;
			for(const public_id of deleteImages) {
				await cloudinary.v2.uploader.destroy(public_id);
				for(const image of event.images) {
					if(image.public_id === public_id) {
						let index = event.images.indexOf(image);
						event.images.splice(index, 1);
					}
				}
			}
		}
		if(req.files) {
			for(const file of req.files) {
				let image = await cloudinary.v2.uploader.upload(file.path);
				event.images.push({
					url: image.secure_url,
					public_id: image.public_id
				});
			}
		}
    event.title = req.body.title;
    event.description = req.body.description;
    event.city = req.body.city;
    event.venue = req.body.venue;
    event.lat = req.body.lat;
    event.lng = req.body.lng;
    event.mainImage = req.body.mainImage;
    event.save();
    res.redirect(`/event/${event.id}`);
}

export const deleteEvent = async(req, res, next) => {
    let event = await Event.findById(req.params.id);
    await Event.findByIdAndRemove();
    res.redirect("/event");
}