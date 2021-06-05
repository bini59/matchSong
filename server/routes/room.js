var express = require('express');
var router = express.Router();
var songs = require("./songs").module()

const ending = {
    title : "게임 종료",
    hint : [
        {
            category : "게임 상태",
            context : "게임 종료",
            time : 9998
        },
        {
            category : "엔딩곡",
            context : "아이묭 - 사랑을 전하고 싶다던가",
            time : 9995
        }
    ],
    ans : ["사랑을 전하고 싶다던가"],
    url : "https://docs.google.com/uc?export=open&id=1224xc1LS-hmCieCi3SniLdlbdDh5j8Tl",
    duration : 9999
}

const genre = ["jpop", "animeSongName", "animeSong", "characterSong", "girlIdol2020"]

const random = (num, g)=>{
    let arr = []
    while(arr.length < num){
        let x= Math.random()
        let t = Math.floor(x*songs[g].length)
        if(arr.indexOf(t) === -1) arr.push(t)
    }
    return arr
}

router.post('/', (req, res)=>{
    console.log(room)
    res.json(JSON.stringify(room))
})


router.post('/genres', (req, res)=>{
    let num = []
    genre.map((g)=>{
        num.push(songs[g].length)
    })

    res.json(JSON.stringify({genre : num}))
})


router.post('/add', function(req, res, next) {
    let Room = req.body;
    
    Room.genre.map((n, idx)=>{
        let songN = random(Math.ceil(n), genre[idx])
        for(let i=0;i<songN.length;i++) Room.Song.push(songs[genre[idx]][songN[i]])
    })

    Room.Song.push(ending)
    room.rooms.push(Room);
    console.log(room)
    res.json(JSON.stringify(room))
});



module.exports = router;
