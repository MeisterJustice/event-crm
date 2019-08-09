export const getAdmin = (req, res, next) => {
    res.json({message: "admin route"});
}

export const getCreateBlog = (req, res, next) => {
    res.json({message: "admin create blog"})
}

export const postBlog = (req, res, next) => {
    res.json({message: "admin post blog"})
}

export const getCreateEvent = (req, res, next) => {
    res.json({message: "admin create event"})
}

export const postEvent = (req, res, next) => {
    res.json({message: "admin post event"})
}

export const getEditBlog = (req, res, next) => {
    res.json({message: "admin edit blog"})
}

export const putBlog = (req, res, next) => {
    res.json({message: "admin put blog"})
}

export const deleteBlog = (req, res, next) => {
    res.json({message: "admin delete blog"})
}

export const getEditEvent = (req, res, next) => {
    res.json({message: "admin edit event"})
}

export const putEvent = (req, res, next) => {
    res.json({message: "admin put event"})
}

export const deleteEvent = (req, res, next) => {
    res.json({message: "admin delete event"})
}