var Event = require('../models/event');
var EventComment = require('../models/event-comment');

exports.eventComment = async(req, res, next) => {
  let event = await Event.findById(req.params.id);
  let comment = await EventComment.create(req.body);
  await comment.save();
  await event.comments.push(comment);
  await event.save();
  console.log(`new comment: ${comment.description}`);
  res.redirect(`/event/${event.id}`);
}

exports.deleteEvent = async(req, res, next) => {
  let event = await Event.findById(req.params.id);
  await EventComment.findByIdAndRemove(req.params.event_comment);
  res.redirect(`/event/${event.id}`);
}