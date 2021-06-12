let usercolor = [
    "red", "blue", "yellow", "green", "purple", "white", "chocolate", "cyan"
  ]

let correct = {};
let skip = {}
let users = {}

let gameStarted = false



module.exports = (app, socket)=>{

    // remove user
    socket.on("disconnect", (data)=>{
        let title = Array.from(clients[socket.id].keys())[1]        
        let idx = room.rooms.findIndex(i => i.title === title)

        let usrIdx = users[title].indexOf(socket.id)

        room.rooms[idx].users.splice(usrIdx, 1)
        users[title].splice(usrIdx, 1)

        if(usrIdx === 0 && room.rooms[idx].users.length > 0){
            room.rooms[idx].users[0].roomMaster = true;
        }
        app.io.in(title).emit("remove-user", room.rooms[idx]);
        if(room.rooms[idx].users.length === 0){
            room.rooms.splice(idx, 1)
        }
    })

    socket.on("vote-skip", (data)=>{
        if(skip[data.title].findIndex(i => i === data.user.nickname) === -1){
            skip[data.title].push(data.user.nickname);
            app.io.in(data.title).emit("notice-skip", {num : skip[data.title].length})
        }
            
        if(skip[data.title].length >= room.rooms[data.idx].users.length-1){
            room.rooms[data.idx].Song[room.rooms[data.idx].songN[0]]
            app.io.in(data.title).emit("skipped", {
                data : "skip"
            });
        }
    })

    socket.on("send-chat", (data)=>{
        app.io.in(data.title).emit("receive-chat", data)

        console.log(app.io.in(data.title).adapter.sids[0])

        room.rooms[data.idx].Song[room.rooms[data.idx].songN[0]].ans.map((i)=>{
            if(i===data.chat && !correct[data.title] && gameStarted){
                correct[data.title] = true;
                // to increase user score
                let usIdx = room.rooms[data.idx].users.findIndex(i => i.nickname===data.user.nickname)
                if(usIdx !== -1){
                    room.rooms[data.idx].users[usIdx].score += 1;
                    app.io.in(data.title).emit("correct", {
                        room : room.rooms[data.idx],
                        user : data.user
                    })
                }
            }
        })
    })
    // start game
    socket.on("req-start-game", (data)=>{
        correct[data.title] = false;
        skip[data.title] = [];

        
        if (room.rooms[data.idx].songN[0] != room.rooms[data.idx].songN[1] && data.first !== -1){
            room.rooms[data.idx].songN[0] += 1;
        }
        app.io.in(data.title).emit("end-game", {
            room : room.rooms[data.idx]
        })
        gameStarted = false
        setTimeout(()=>{
            app.io.in(data.title).emit("res-start-game")
            gameStarted = true
        },4000)  
    })

    // join room
    socket.on("join-room", (data)=>{
        socket.join(data.title);
        // check answer
        correct[data.title] = false;
        skip[data.title] = [];
        users[data.title] = []

    })


    // Add user
    socket.on("req-add-user", (data)=>{
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

        // test
        users[data.room.title].push(socket.id)
        //users[data.title].push([user.nickname, app.io.in(data.title)])

        app.io.in(data.room.title).emit("res-add-user", room.rooms[idx])
    })

}