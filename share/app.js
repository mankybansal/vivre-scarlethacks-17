var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose  = require('mongoose');
var jwt    = require('jsonwebtoken');
var User = require('.//app/models/user');
var Post = require('.//app/models/posts');

mongoose.connect('mongodb://localhost:27017/scarlethacks');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');
var communities = require('./routes/community');
var posts   = require('./routes/posts');
var search = require('./routes/search');
var barcode = require('./routes/barcode');
var request = require('./routes/request');
var borrowReq = require('./routes/borrowReq');
var app = express();
var io = require('socket.io').listen(app.listen(3003));
var walmart = require('walmart')('zbs8p568qpq4qyrbf2a5kev2');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var id = " ";

io.on('connection', function (socket) {
    console.log('client connect');
     id = socket.id
     console.log("id"+id)

    socket.on('barcode', function (data) {
    app.get('/barcode/:barcode',barcode)
    io.sockets.emit('message', data);
    console.log(barcode);
    walmart.getItemByUPC(data).then(function(item) {
    console.log(item.product);
         
});


 });
    socket.on('update-url',function(data){
        console.log(data);
        console.log(data[0]);
    })
});
app.use(function(req,res,next){
    req.io = io;
    req.id = id;
    next();
});




app.use('/', index);

app.use('/login',login);
app.use('/register',register);
app.use('/community',communities);
app.use('/search',search);
app.use('/barcode',barcode);


function authenticate(req,res,next){
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token,"karthic", function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
};
app.use('/users',authenticate, users);
app.use('/posts',authenticate,posts);
app.use('/request',authenticate,request);
app.use('/borrowReq',authenticate,borrowReq);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
