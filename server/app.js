const createError = require('http-errors');
const express = require('express');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const io = require("socket.io")

const RoomRouter = require('./routes/room');
const chatRouter = require("./routes/chat")

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

app.use('/room', RoomRouter);
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
      origin: ["https://3000-blush-wolverine-2p0rzvu8.ws-us07.gitpod.io"],
      methods:["GET","POST"]
  }
  });

app.io.on('connection', (socket)=>{
  console.log("user connect")
  socket.on("add-user", (data)=>{
    let idx = room.rooms.findIndex(i => i.title === data.room.title)
    let userN = room.rooms[idx].users.length
    let user = {
      nickname : data.username,
      color : "blue",
      roomMaster : false,
      score : 0
    }
    if(userN == 0) user.roomMaster = true;

    room.rooms[idx].users.push(user);
    console.log(data)

    app.io.emit("AddUsr", room.rooms[idx])
  })
})

module.exports = app;
