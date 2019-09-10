const crypto = require('crypto');
const cloudinary = require('cloudinary');
const cloudinaryAuth = require('../config/auth');
cloudinary.config({
	cloud_name: cloudinaryAuth.cloudinaryUpload.cloud_name,
	api_key: cloudinaryAuth.cloudinaryUpload.api_key,
	api_secret: cloudinaryAuth.cloudinaryUpload.api_secret
});
const cloudinaryStorage = require('multer-storage-cloudinary');
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'surf-shop',
  allowedFormats: ['jpeg', 'jpg', 'png'],
  filename: function (req, file, cb) {
  	let buf = crypto.randomBytes(16);
  	buf = buf.toString('hex');
  	let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
  	uniqFileName += buf;
    cb(undefined, uniqFileName );
  }
});

module.exports = {
	cloudinary,
	storage
}