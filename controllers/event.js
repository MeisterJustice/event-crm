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
    let author = await {
        id: req.user._id,
        username: req.user.username
    }

    req.body.author = author;
    
    req.body.images = [];
    for(const file of req.files) {
        let image = await cloudinary.v2.uploader.upload(file.path);
        req.body.images.push({
            url: image.secure_url,
            public_id: image.public_id
        });
    }    

    await Event.create(req.body);
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
    let event = await Event.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/event/${event.id}`);
}

export const deleteEvent = async(req, res, next) => {
    let event = await Event.findById(req.params.id);
    await Event.findByIdAndDelete();
    res.redirect("/event");
}