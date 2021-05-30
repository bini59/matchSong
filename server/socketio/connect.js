let usercolor = [
    "red", "blue", "yellow", "green", "purple", "white", "chocolate", "cyan"
  ]

let correct = {};
let skip = {}

module.exports = (app, socket)=>{
    socket.on("join-room", (data)=>{
        socket.join(data.title);
        correct[data.title] = false;
        skip[data.title] = [];
        
    })
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

        app.io.in(data.room.title).emit("AddUsr", room.rooms[idx])
    })

    socket.on("remove-user", (data)=>{
        let idx = room.rooms.findIndex(i => i.title === data.room.title)
        let usrIdx = room.rooms[idx].users.findIndex(i => i.nickname === data.username)
        room.rooms[idx].users.splice(usrIdx, 1);
        if(usrIdx === 0 && room.rooms[idx].users.length > 0){
            room.rooms[idx].users[0].roomMaster = true;
        }
        console.log("disconnected : ", room.rooms[idx].users)

        app.io.in(data.room.title).emit("remove-user", room.rooms[idx]);

        if(room.rooms[idx].users.length === 0){
            room.rooms.splice(idx, 1)
            console.log(room)
        }
    })

    socket.on("disconnect", (data)=>{
        console.log("disconnect",data);
    })
    socket.on("start-game", (data)=>{
        correct[data.room] = false
        skip[data.room] = [];
    })
    socket.on("vote-skip", (data)=>{
        if(skip[data.title].findIndex(i => i === data.user.nickname) === -1){
            skip[data.title].push(data.user.nickname);
            app.io.in(data.title).emit("notice-skip", {num : skip[data.title].length})
        }
            
        if(skip[data.title].length === room.rooms[data.idx].users.length){
            app.io.in(data.title).emit("skipped", {
                data : "skip"
            });
        }
    })

    socket.on("send-chat-client", (data)=>{
        if(data.user.nickname !== "UNDEFINE")
            app.io.in(data.title).emit("send-chat-server", data)
        room.rooms[data.idx].Song[room.rooms[data.idx].songN[0]].ans.map((i)=>{
            if(i===data.chat && !correct[data.title]){
                correct[data.title] = true;
                if(room.rooms[data.idx].songN[0] < room.rooms[data.idx].songN[1])
                    room.rooms[data.idx].songN[0] += 1
                let usIdx = room.rooms[data.idx].users.findIndex(i => i.nickname===data.user.nickname)
                if(usIdx !== -1){
                    room.rooms[data.idx].users[usIdx].score += 1;
                    app.io.in(data.title).emit("correct", {
                        room : room.rooms[data.idx],
                        user : data.user
                    })
                }
                else{
                    app.io.in(data.title).emit("correct", {
                        room : room.rooms[data.idx],
                        user : "UNDEFINE"
                    })
                }
            }
        })
    })
}