require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var { createServer } = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var logger = require('morgan');
var methodOverride = require('method-override');
var passport = require('passport');
// var seedPosts = require('./seeds';
// seedPosts();

// var routers
var indexRouter = require('./routes');;
var adminRouter = require('./routes/admin');;
var blogRouter = require('./routes/blog');;
var eventRouter = require('./routes/event');;
var blogCommentRouter = require('./routes/blog-comment');;
var eventCommentRouter = require('./routes/event-comment');

const app = express();
const server = createServer(app);


mongoose.set("debug", true);
// CONNECT TO MONGODB
mongoose.connect('mongodb+srv://meister:@event-nbrxk.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.log("ERROR: ", err.message);
});

mongoose.Promise = Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(methodOverride("_method"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(flash());

app.use(require("express-session")({
  secret: "Meister",
  resave: false,
  saveUninitialized: true
}));

// passpor config
app.use(passport.initialize());
app.use(passport.session());
require('./config/local-passport')(passport);
require('./config/facebook-passport')(passport);

// flash config
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.currentUser = req.user;
  next();
});


// configure routes
app.use('/', indexRouter);
app.use("/blog", blogRouter);
app.use("/blog/:id/comments", blogCommentRouter);
app.use("/event", eventRouter);
app.use("/event/:id/comments", eventCommentRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set port
const port = process.env.PORT || 5000;

// Use mongoose promise library
mongoose.Promise = require('bluebird');


server.listen(port, ()=> {
  console.log(`server running on port ${port}`);
});