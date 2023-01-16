//Hooks
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import useTimer from "./timer"

//socketIo
import socketio from 'socket.io-client';

//audioPlayer
import ReactAudioPlayer from "react-audio-player"

import Hint from "./hint"
import Chat from "./chat"


import $ from "jquery"

import {
    selectRooms
} from "../../redux/roomSlice"

import "../../scss/game.scss"
import "../../scss/quiz.scss"


// const quizS = {
//     jpop : "노래 제목",
//     애니 : "노래 제목",
//     애니이름 : "애니 이름",
//     캐릭터송 : "캐릭터",
//     여돌2020 : "노래 제목"
// }

const Game = (props)=>{
    let { id } = useParams();
    

    // set title
    useEffect(()=>{
        $(".mainTitle")[0].innerText = `노래 맞추기 - ${id}`;
    }, [])

    // Set socket
    const [socket, setSocket] = useState(null);
    useEffect(()=>{
        setSocket(socketio.connect("/"))
    }, [])



    // Start game
    useEffect(()=>{
        if(socket){
            // skip vote notice
            socket.on("notice-skip", (data)=>{
                $("#skipProgress")[0].innerHTML = data.num;
            })
        }
    }, [])

    // get room from redux store
    // current room
    const rooms = useSelector(selectRooms)
    let idx = rooms.findIndex(i => i.title === id);
    const room = rooms[idx];

    //Answer show trigger
    const [ansState, setAnstrigger] = useState(false);
    //Answer
    const [ans, setAns] = useState(<div className="ans"><span className="ansMsg">답</span> : {rooms[idx].Song[rooms[idx].songN[0]].title}</div>)
    //ontimer
    const [onTimer, setTimer] = useState(false);

    const time = useTimer({onTimer : onTimer, room : room});
    

    /*
        remove Ans
        change Ans

        remove Hint
        remove skip vote progress

        start  Timer
        play   Song
    */
    const startGame = (Room)=>{
        setTimer(false);
        setAnstrigger(false);
        setAns(<div className="ans"><span className="ansMsg">답</span> : {Room.Song[Room.songN[0]].title}</div>);

        $(".hint")[0].innerHTML = ``;
        $("#skipProgress")[0].innerHTML = 0;

        setTimer(true);
        $("#audio")[0].play();
    }

    return(
        <div className="quiz">
            <div className="title">
                <span className="remainSong">남은곡 ( {room.songN[1]-room.songN[0]} / {room.songN[1]} )</span><br/>
                {/* <span className="description"><span className="_1">음악</span>을 듣고 <span className="_2">{quizS[room.Song[room.songN[0]].genre]}</span>을 입력하세요</span><br/> */}
                <span className="description"><span className="_1">음악</span>을 듣고 <span className="_2">노래제목</span>을 입력하세요</span><br/>
                <span className="remainSec">- {time}초 -</span><br/>
                <ReactAudioPlayer 
                    src={room.Song[room.songN[0]].url}
                    id="audio"
                    type="mpeg"
                />
            </div>
            <div className="hint">
                {onTimer ? <Hint sec={time} hints={room.Song[room.songN[0]].hint}/> : ""}
            </div>
            {ansState ? ans : <div className="ans"></div>}
            {/* if socket, rendering Chat */}
            {socket ?
            <Chat 
                room={room} socket={socket} idx={idx} time={time}
                correct={()=>{setAnstrigger(true)}}
                startGame={()=>{socket.emit("req-start-game", {title : room.title, idx : idx, first : -1})}}
                FuncstartGame={(Room)=>{startGame(Room)}}
                timerOff={()=>{setTimer(false)}}
                />
            : ""}
        </div>
    );
}


export default Game;