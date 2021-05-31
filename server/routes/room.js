var express = require('express');
var router = express.Router();
var songs = require("./songs").module()

const random = (num)=>{
    let arr = []
    while(arr.length < num){
        let x= Math.random()
        let t = Math.floor(x*songs.length)
        if(arr.indexOf(t) === -1) arr.push(t)
    }
    return arr
}

router.post('/', (req, res)=>{
    console.log(room)
    res.json(JSON.stringify(room))
})

router.post('/add', function(req, res, next) {
    let Room = req.body;
    let songNum = random(Room.songN[1]);
    for(let i = 0; i < Room.songN[1]; i++){
        Room.Song.push(songs[songNum[i]]);
    }
    room.rooms.push(Room);
    console.log(room)
    res.json(JSON.stringify(room))
});



module.exports = router;
