import Blog from '../models/blog';

export const getBlog = async (req, res, next) => {
    let findBlog = await Blog.find({});
    res.render("blog/index", {
        findBlog
    });
}

export const showBlog = async (req, res, next) => {
    let blog = await Blog.findById(req.params.id);
    res.render("blog/show", {
        blog
    });
}