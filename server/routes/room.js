var express = require('express');
var router = express.Router();

let songs = [
    {
        title : "We go - 프로미스나인",
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
        duration : 60
    },
    {
        title : "We go - 프로미스나인",
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
        duration : 60
    },
    {
        title : "We go - 프로미스나인",
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
        duration : 60
    },
    {
        title : "We go - 프로미스나인",
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
        duration : 60
    },
    {
        title : "We go - 프로미스나인",
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
        duration : 60
    },
    {
        title : "We go - 프로미스나인",
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
        duration : 60
    },
    {
        title : "We go - 프로미스나인",
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
        duration : 60
    },
    {
        title : "We go - 프로미스나인",
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
        duration : 60
    },
    {
        title : "We go - 프로미스나인",
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
        duration : 60
    },
    {
        title : "We go - 프로미스나인",
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
        duration : 60
    },
    {
        title : "We go - 프로미스나인",
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
        duration : 60
    },
    {
        title : "We go - 프로미스나인",
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
        duration : 60
    },
    {
        title : "We go - 프로미스나인",
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
        duration : 60
    },
    {
        title : "We go - 프로미스나인",
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
        duration : 60
    },
    {
        title : "We go - 프로미스나인",
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
        duration : 60
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
