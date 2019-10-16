var Blog = require('../models/blog');
var BlogComment = require('../models/blog-comment');

exports.postComment = async(req, res, next) => {
  let blog = await Blog.findById(req.params.id);
  let comment = await BlogComment.create(req.body);
  await comment.save();
  await blog.comments.push(comment);
  await blog.save();
  console.log(`new comment: ${comment.description}`);
  res.redirect(`/blog/${blog.id}`);
}

exports.deleteComment = async(req, res, next) => {
  let blog = await Blog.findById(req.params.id);
  await BlogComment.findByIdAndRemove(req.params.blog_comment);
  res.redirect(`/blog/${blog.id}`);
}