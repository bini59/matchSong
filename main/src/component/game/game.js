import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux"
import {useParams, useLocation} from "react-router-dom"
import Song from  "./SongInfo";
import Btns from  "./btns";
import Log from   "./log";
import Score from "./score";


import {
    changeRooms,
    selectRoom
} from "../../redux/roomSlice"

import "../../scss/game.scss"
import "../../scss/quiz.scss"

const Game = (props)=>{
    const dispatch = useDispatch();
    let {id} = useParams();
    const [logTrigger, setTrigger] = useState(false);
    const [start, setStart] = useState(null);

    const location = useLocation();
    
    console.log(props)
    let rooms = location.state.rooms;
    console.log(rooms)
    let idx = rooms.findIndex(i => i.title === id);
    console.log(idx)
    let chat = [
        {
            username : "holy",
            color : "red",
            context : "아 죽고싶다."
        }
    ]

    const songInfos = (room)=>{
        let info = {
            users : [],
            Song :  [{title : "", duration : 0, url: false, hint : [{category : "", context : "", time : 0}], ans : [""]}],
            title : "",
            genre : "",
            songN : [0, 0]
        }
        if (room){
            info.users = room.users;
            info.Song = room.Song;
            info.title = room.title;
            info.genre = room.genre;
            info.songN = room.songN;
        }
        return info
    }

    useEffect(()=>{
        const recipeUrl = "https://3001-blush-wolverine-2p0rzvu8.ws-us07.gitpod.io/room";
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({})
        };
        fetch(recipeUrl, requestMetadata).then(res => res.json())
        .then(json => {
            dispatch(changeRooms(JSON.parse(json).rooms))
        })
        // const getRoom = async ()=>{
        //     const recipeUrl = "https://3001-blush-wolverine-2p0rzvu8.ws-us07.gitpod.io/room";
        //     const requestMetadata = {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json'
        //         },
        //         body: JSON.stringify({})
        //     };
        //     const res = await fetch(recipeUrl, requestMetadata)
        //     const json = await res.json()
        //     dispatch(changeRooms(JSON.parse(json).rooms))      
        // }
        // getRoom();
      }, [dispatch])

    return(
        <div className="game">
            <Score users={songInfos(rooms[idx]).users}/>
            <Song songs={songInfos(rooms[idx]).Song} setFunc={(func)=>{setStart(func)}}/>
            <Btns 
                openLog={()=>{setTrigger(true)}}
                startGame={()=>{start()}}
                exitGame={(name)=>{rooms[idx] ? songInfos(rooms[idx]).users.splice(songInfos(rooms[idx]).users.findIndex(i=>i.nickname===name), 1) : console.log("not loaded!!")}}
                title={songInfos(rooms[idx]).title}
            />
            {logTrigger ? <Log logs={chat} closeBox={()=>{setTrigger(false)}}/> : ""}
        </div>
    );
}

// class App extends Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             logOn : false,
//             start : ''
//         }
//         //under two object must be served by server
//         this.users = [
//             {
//                 nickname : "ㅇㅇ",
//                 score : 43,
//                 color : "red",
//                 roomMaster : true
//             },
//             {
//                 nickname : "bini",
//                 score : 73,
//                 color : "blue",
//                 roomMaster : false
//             }
//         ]
//         this.songs = [
//             {
//                 title : "We go - 프로미스나인",
//                 hint : [
//                     {
//                         category : "가수힌트",
//                         context : "프로미스나인",
//                         time : 55
//                     },
//                     {
//                         category : "초성힌트",
//                         context : "ㅇ ㄱㅇ",
//                         time : 50
//                     }
//                 ],
//                 ans : ["we go", "위 고", "위 고우"],
//                 url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
//                 duration : 60
//             },
//             {
//                 title : "Feel good - 프로미스나인",
//                 hint : [
//                     {
//                         category : "가수힌트",
//                         context : "프로미스나인",
//                         time : 40
//                     },
//                     {
//                         category : "초성힌트",
//                         context : "ㅍ ㄱ",
//                         time : 20
//                     }
//                 ],
//                 ans : ["feel good", "필 굿"],
//                 url : "https://docs.google.com/uc?export=open&id=1ioGdk3y1sEy5MipF8I2r1t3vph7Ru0lY",
//                 duration : 60
//             }
//         ]
//         this.chat = [
//             {
//                 username : "holy",
//                 color : "red",
//                 context : "아 죽고싶다."
//             }
//         ]
//     }
//     render(){
//         return(
//             <div className="main">
//                 <Score users={this.users}/>
//                 <Song songs={this.songs} setFunc={(func)=>{this.setState({start : func})}}/>
//                 <Btns 
//                     openLog={()=>{this.setState({logOn : true})}}
//                     startGame={()=>{this.state.start()}}
//                     exitGame={(name)=>{this.users.splice(this.users.findIndex(i=>i.nickname===name), 1);console.log(this.users)}}
//                     addUser={(user)=>{this.users.push(user)}}
//                 />
//                 {this.state.logOn ? <Log logs={this.chat} closeBox={()=>{this.setState({logOn : false})}}/> : ""}
//             </div>
//         );
//     }
// }

export default Game;