import Blog from '../models/blog';
import BlogComment from '../models/blog-comment';
import BlogCommentReply from '../models/blog-comment-reply';

export const postComment = async(req, res, next) => {
  let blog = await Blog.findById(req.params.id);
  let comment = await BlogComment.create(req.body);
  await comment.save();
  await blog.comments.push(comment);
  await blog.save();
  console.log(`new comment: ${comment.description}`);
  res.redirect(`/blog/${blog.id}`);
}

export const deleteComment = async(req, res, next) => {
  let blog = await Blog.findById(req.params.id);
  await BlogComment.findByIdAndRemove(req.params.blog_comment);
  res.redirect(`/blog/${blog.id}`);
}

export const postReply = async(req, res, next) => {
  let blog = await Blog.findById(req.params.id);
  let comment = await BlogComment.findById(req.params.blog_comment);
  let reply = await BlogCommentReply.create(req.body);
  await reply.save();
  await comment.replies.push(reply);
  await comment.save();
  console.log(`new comment reply: ${reply.description}`);
  res.redirect(`/blog/${blog.id}`);
}