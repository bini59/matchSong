var express = require('express');
var router = express.Router();

let songs = [
    {
        title : "We go - 프로미스나인1",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 30
    },
    {
        title : "We go - 프로미스나인2",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 31
    },
    {
        title : "We go - 프로미스나인3",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 29
    },
    {
        title : "We go - 프로미스나인4",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 28
    },
    {
        title : "We go - 프로미스나인5",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 27
    },
    {
        title : "We go - 프로미스나인6",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 26
    },
    {
        title : "We go - 프로미스나인7",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 25
    },
    {
        title : "We go - 프로미스나인8",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 24
    },
    {
        title : "We go - 프로미스나인9",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 23
    },
    {
        title : "We go - 프로미스나인10",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 22
    },
    {
        title : "We go - 프로미스나인11",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 21
    },
    {
        title : "We go - 프로미스나인12",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 20
    },
    {
        title : "We go - 프로미스나인13",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 19
    },
    {
        title : "We go - 프로미스나인14",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 18
    },
    {
        title : "We go - 프로미스나인15",
        hint : [
            {
                category : "가수힌트",
                context : "프로미스나인",
                time : 55
            },
            {
                category : "초성힌트",
                context : "ㅇ ㄱㅇ",
                time : 50
            }
        ],
        ans : ["we go", "위 고", "위 고우"],
        url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
        duration : 17
    },

]

const random = (num)=>{
    let arr = []
    while(arr.length < num){
        let x= Math.random()
        let t = Math.floor(x*songs.length)
        if(arr.indexOf() === -1) arr.push(t)
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
