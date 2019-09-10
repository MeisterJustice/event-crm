import Event from '../models/event';
const { cloudinary } = require('../cloudinary');

export const errorHandler = (fn) =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
}

export const deleteProfileImage = async (req) => {
	if (req.file) await cloudinary.v2.uploader.destroy(req.file.public_id);
}
    