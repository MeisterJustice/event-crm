import Blog from '../models/blog';
import BlogComment from '../models/blog-comment';

export const getBlog = async (req, res, next) => {
    let blog = await Blog.paginate({}, {
        page: req.query.page || 1,
        limit: 10
    });
    blog.page = Number(blog.page);
    res.render("blog/index", {
        blog
    });
}

export const showBlog = async (req, res, next) => {
    let latestBlog = await Blog.find({});
    let blog = await Blog.findById(req.params.id).populate('comments').exec();
    res.render("blog/show", {
        blog, latestBlog
    });
}