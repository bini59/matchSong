import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import socketio from 'socket.io-client';
import Song from  "./SongInfo";




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

    const [socket, setSocket] = useState(null);
    useEffect(()=>{
        setSocket(socketio.connect("https://3001-blush-wolverine-2p0rzvu8.ws-us08.gitpod.io"))
    }, [])
    

    // get room from redux store
    // current room
    const rooms = useSelector(selectRoom)
    let idx = rooms.findIndex(i => i.title === id);



    return(
        <div className="game"> 
            {socket ? <Song songs={rooms[idx].Song} setFunc={(func)=>{setStart(func)}} socket={socket} idx={idx}/> : ""}
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