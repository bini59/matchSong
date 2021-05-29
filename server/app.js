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
      origin: ["https://3000-blush-wolverine-2p0rzvu8.ws-us08.gitpod.io"],
      methods:["GET","POST"]
  }
});



let usercolor = [
  "red", "blue", "yellow", "green", "purple", "white", "chocolate", "cyan"
]
  
app.io.on('connection', (socket)=>{
  console.log("user connect")
  socket.on("add-user", (data)=>{
    let idx = room.rooms.findIndex(i => i.title === data.room.title)
    let userN = room.rooms[idx].users.length
    let user = {
      nickname : data.username,
      color : usercolor[userN],
      roomMaster : false,
      score : 0
    }
    if(userN == 0) user.roomMaster = true;

    room.rooms[idx].users.push(user);

    app.io.emit("AddUsr", room.rooms[idx])
  })


  socket.on("remove-user", (data)=>{
    let idx = room.rooms.findIndex(i => i.title === data.room.title)
    let usrIdx = room.rooms[idx].users.findIndex(i => i.nickname === data.username)
    room.rooms[idx].users.splice(usrIdx, 1);
    if(usrIdx === 0 && room.rooms[idx].users.length > 0){
      room.rooms[idx].users[0].roomMaster = true;
    }
    console.log("disconnected : ", room.rooms[idx].users)

    app.io.emit("remove-user", room.rooms[idx]);
  })
  socket.on("disconnect", (data)=>{
    console.log("disconnect",data);
  })

  socket.on("send-chat-client", (data)=>{
    console.log(data);
    app.io.emit("send-chat-server", data)
  })
})

module.exports = app;
