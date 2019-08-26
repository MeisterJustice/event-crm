module.exports = {
    'facebookAuth' : {
        'clientID': 'htbh',
        'clientSecret': 'gtgv5',
        'callbackURL': 'http://localhost:3000/auth/facebook/callback',
        'profileFields': ['id', 'email', 'name']
    },
    'cloudinaryUpload': {
        'cloud_name': process.env.CLOUDINARY_NAME,
        'api_key': process.env.CLOUDINARY_API_KEY,
        'api_secret': process.env.CLOUDINARY_SECRET
    }
}