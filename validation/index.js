import User from '../models/user';
import Event from '../models/event';
const { cloudinary } = require('../cloudinary');


export const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    req.session.redirectTo = req.originalUrl;
    res.redirect("/login");
}


export const isEventOwner = async(req, res, next) => {
    let event = await Event.findById(req.params.id);
		if (event.author.id.equals(req.user._id)) {
			res.locals.event = event;
			return next();
		}
		req.flash('error', 'Access denied!');
		res.redirect('back');
}

export const checkIfUserExists = async (req, res, next) => {
    let emailExists = await User.findOne({'email': req.body.email});
    let userNameExists = await User.findOne({'username': req.body.username});
    if(emailExists) {
        req.flash('error', `A user with the given email, ${emailExists} is already registered`);
        return res.redirect('/register');
    }
    if(userNameExists) {
        req.flash('error', `A user with the given username, ${userNameExists} is already registered`);
        return res.redirect('/register');
    }
    next();
}

export const isValidPassword = async (req, res, next) => {
    const { user } = await User.authenticate()(req.user.username, req.body.currentPassword)
    if(user) { 
        res.locals.user = user;
        next();
    } else {
        req.flash('error', 'Current password is incorrect!');
        return res.redirect('/profile');
    }
}

export const changePassword = async (req, res, next) => {
    const {
		newPassword,
		passwordConfirmation
	} = req.body;
	
	if (newPassword && !passwordConfirmation) {
		req.flash('error', 'Missing password confirmation!');
		return res.redirect('/profile');
	} else if (newPassword && passwordConfirmation) {
		const { user } = res.locals;
		if (newPassword === passwordConfirmation) {
			await user.setPassword(newPassword);
			next();
		} else {
			req.flash('error', 'New password must match!');
			return res.redirect('/profile');
		}
	} else {
		next();
	}
}