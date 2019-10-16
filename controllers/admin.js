var User = require('../models/user');
var Blog = require('../models/blog');
var Event = require('../models/event');
var Email = require('../models/email-signup');
var Donate = require('../models/donate');

exports.getAdmin = async (req, res, next) => {
    let users = await User.find({});
    let blogs = await Blog.find({});
    let events = await Event.find({});
    let emails = await Email.find({});
    let donate = await Donate.find({});
    res.render("admin/index", {
        users,
        blogs,
        events,
        emails,
        donate
    }); 
}

exports.getBlog = async (req, res, next) => {
    let blogs = await Blog.find({});
    res.render("admin/blog/index", {
        blogs
    });
}

exports.getUser = async (req, res, next) => {
    let users = await User.find({});
    let emails = await Email.find({});
    res.render("admin/user", {
        users,
        emails
    });
}

exports.getCreateBlog = async (req, res, next) => {
    res.render("admin/blog/new");
}

exports.postBlog = async (req, res, next) => {
    let author = await {
        id: req.user._id,
        username: req.user.username
    }

    req.body.author = author;    

    await Blog.create(req.body);
    res.redirect("/admin/blog");
}

exports.getEvent = async (req, res, next) => {
    let events = await Event.find({});
    res.render("admin/event/index", {
        events
    });
}

exports.getCreateEvent = async (req, res, next) => {
    res.render("admin/event/new")
}

exports.postEvent = async (req, res, next) => {
    let author = await {
        id: req.user._id,
        username: req.user.username
    }

    req.body.author = author;
    let createEvent = await Event.create(req.body);
    res.redirect("/admin/event");
}

exports.getEditBlog = async (req, res, next) => {
    let blog = await Blog.findById(req.params.blog_id);
    res.render("admin/blog/edit", {blog});
}

exports.putBlog = async (req, res, next) => {
    let editBlog = await Blog.findByIdAndUpdate(req.params.blog_id, req.body);
    res.redirect("/admin/blog");
}

exports.deleteBlog = async (req, res, next) => {
    let deleteBlog = await Blog.findByIdAndDelete(req.params.blog_id)
    res.redirect("/admin/blog");
}

exports.getEditEvent = async (req, res, next) => {
    let event = await Event.findById(req.params.event_id);
    res.render("admin/event/edit", {event})
}

exports.putEvent = async (req, res, next) => {
    let editEvent = await Event.findByIdAndUpdate(req.params.event_id, req.body);
    res.redirect("/admin/event");
}

exports.deleteEvent = async (req, res, next) => {
    let deleteEvent = await Event.findByIdAndDelete(req.params.event_id)
    res.redirect("/admin/event");
}