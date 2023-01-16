const createError = require('http-errors');
const express = require('express');
const cors = require("cors");
const path = require('path');
const logger = require('morgan');
const io = require("socket.io");

require("dotenv").config();
const { ORIGIN } = process.env;


const RoomRouter = require('./routes/room');

const roomhandler = require("./socketio/connect");

global.room = {
  rooms : []
}
global.clients = {
  
}


const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../main/build')));

app.use('/room', cors(),RoomRouter);
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, '../main/build/index.html'))
})
app.use('/game', (req, res)=>{})

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
      origin: [ORIGIN],
      methods:["GET","POST"]
  }
});

  
app.io.on('connection', (socket)=>{
  clients[socket.id] = socket.rooms
  roomhandler(app, socket);
})

module.exports = app;
