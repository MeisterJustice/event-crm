export const getBlog = (req, res, next) => {
    res.json({
        message: "blog route"
    });
}

export const showBlog = (req, res, next) => {
    res.json({
        message: "show blog"
    })
}