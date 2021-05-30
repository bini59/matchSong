const createError = require('http-errors');
const express = require('express');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const io = require("socket.io")

const RoomRouter = require('./routes/room');
const chatRouter = require("./routes/chat")

const roomhandler = require("./socketio/connect");

global.room = {
  rooms : []
}

const app = express();


app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/room', cors(),RoomRouter);
app.use('/chat', chatRouter);
app.get('/', (req,res)=>{})

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


app.io = io('', {
  cors: {
      origin: ["https://3000-orange-vicuna-9uo5wxk0.ws-us08.gitpod.io"],
      methods:["GET","POST"]
  }
});

  
app.io.on('connection', (socket)=>{
  roomhandler(app, socket);
})

module.exports = app;
