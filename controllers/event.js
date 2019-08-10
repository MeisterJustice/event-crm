import Event from '../models/event';

export const getEvent = async(req, res, next) => {
    let findEvent = await Event.find({});
    res.render("event/index", {findEvent});
  }

  export const getCreateEvent = async(req, res, next) => {
    res.render("event/new")
}

export const postEvent = async(req, res, next) => {
    let createEvent = Event.create(req.body);
    res.redirect("/event");
}

export const showEvent = async(req, res, next) => {
    let event = await Event.findById(req.params.id);
    res.render("event/show", {event})
}

export const getEdit = async(req, res, next) => {
    let showEdit = await Event.findById(req.params.id);
    res.render("event/edit", {showEdit})
}

export const putEvent = async(req, res, next) => {
    let editEvent = await Event.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/event/${editEvent.id}`);
}

export const deleteEvent = async(req, res, next) => {
    await Event.findByIdAndRemove(req.params.id);
    res.redirect("/event");
}