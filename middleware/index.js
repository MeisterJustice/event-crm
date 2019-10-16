var Event = require('../models/event');
const { cloudinary } = require('../cloudinary');

exports.errorHandler = (fn) =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
}

exports.deleteProfileImage = async (req) => {
	if (req.file) await cloudinary.v2.uploader.destroy(req.file.public_id);
}
    