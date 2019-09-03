import User from '../models/user';
import Blog from '../models/blog';
import Event from '../models/event';

export const getAdmin = async (req, res, next) => {
    let getUsers = await User.find({});
    let getBlogs = await Blog.find({});
    let getEvents = await Event.find({});
    res.render("admin/index", {
        getUsers,
        getBlogs,
        getEvents
    }); 
}

export const getBlog = async (req, res, next) => {
    let blogs = await Blog.find({});
    res.render("admin/blog/index", {
        blogs
    });
}

export const getCreateBlog = async (req, res, next) => {
    res.render("admin/blog/new");
}

export const postBlog = async (req, res, next) => {
    let author = await {
        id: req.user._id,
        username: req.user.username
    }

    req.body.author = author;    

    await Blog.create(req.body);
    res.redirect("/admin/blog");
}

export const getEvent = async (req, res, next) => {
    let events = await Event.find({});
    res.render("admin/event/index", {
        events
    });
}

export const getCreateEvent = async (req, res, next) => {
    res.render("admin/event/new")
}

export const postEvent = async (req, res, next) => {
    let author = await {
        id: req.user._id,
        username: req.user.username
    }

    req.body.author = author;
    let createEvent = await Event.create(req.body);
    res.redirect("/admin/event");
}

export const getEditBlog = async (req, res, next) => {
    let blog = await Blog.findById(req.params.blog_id);
    res.render("admin/blog/edit", {blog});
}

export const putBlog = async (req, res, next) => {
    let editBlog = await Blog.findByIdAndUpdate(req.params.blog_id, req.body);
    res.redirect("/admin/blog");
}

export const deleteBlog = async (req, res, next) => {
    let deleteBlog = await Blog.findByIdAndRemove(req.params.blog_id)
    res.redirect("/admin/blog");
}

export const getEditEvent = async (req, res, next) => {
    let event = await Event.findById(req.params.event_id);
    res.render("admin/event/edit", {event})
}

export const putEvent = async (req, res, next) => {
    let editEvent = await Event.findByIdAndUpdate(req.params.event_id, req.body);
    res.redirect("/admin/event");
}

export const deleteEvent = async (req, res, next) => {
    let deleteEvent = await Event.findByIdAndRemove(req.params.event_id)
    res.redirect("/admin/event");
}