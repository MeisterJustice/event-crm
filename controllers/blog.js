import Blog from '../models/blog';

export const getBlog = async(req, res, next) => {
    let findBlog = await Blog.find({});
    res.json(findBlog);
}

export const showBlog = async(req, res, next) => {
    let blogShow = await Blog.findById(req.params.id);
    res.json(blogShow);
}