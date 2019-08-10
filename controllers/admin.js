import User from '../models/user';
import Blog from '../models/blog';
import Event from '../models/event';

export const getAdmin = async(req, res, next) => {
    let getUsers = await User.find({});
    let getBlogs = await Blog.find({});
    let getEvents = await Event.find({});
    res.render("admin/index", {getUsers, getBlogs, getEvents});
}

export const getCreateBlog = async(req, res, next) => {
    res.json({message: "admin create blog"})
}

export const postBlog = async(req, res, next) => {
    let createBlog = await Blog.create(req.body);
    res.json(createBlog);
}

export const getCreateEvent = async(req, res, next) => {
    res.json({message: "admin create event"})
}

export const postEvent = async(req, res, next) => {
    let createEvent = await Event.create(req.body);
    res.json(createEvent);
}

export const getEditBlog = async(req, res, next) => {
    let getBlogEdit = await Blog.findById(req.params.blog_id);
    res.json({message: "admin edit blog"})
}

export const putBlog = async(req, res, next) => {
    let editBlog = await Blog.findByIdAndUpdate(req.params.blog_id, req.body);
    res.json(editBlog);
}

export const deleteBlog = async(req, res, next) => {
    let deleteBlog = await Blog.findByIdAndRemove(req.params.blog_id)
    res.json({message: "admin delete blog"})
}

export const getEditEvent = async(req, res, next) => {
    let getEventEdit = await Event.findById(req.params.event_id);
    res.json({message: "admin edit event"})
}

export const putEvent = async(req, res, next) => {
    let editEvent = await Event.findByIdAndUpdate(req.params.event_id, req.body);
    res.json(editEvent)
}

export const deleteEvent = async(req, res, next) => {
    let deleteEvent = await Event.findByIdAndRemove(req.params.event_id)
    res.json({message: "admin delete event"})
}