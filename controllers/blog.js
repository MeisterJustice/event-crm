import Blog from '../models/blog';
import BlogComment from '../models/blog-comment';

export const getBlog = async (req, res, next) => {
    let findBlog = await Blog.find({});
    res.render("blog/index", {
        findBlog
    });
}

export const showBlog = async (req, res, next) => {
    let latestBlog = await Blog.find({});
    let blog = await Blog.findById(req.params.id).populate('comments').exec();
    res.render("blog/show", {
        blog, latestBlog
    });
}