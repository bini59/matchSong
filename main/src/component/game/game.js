import React, {useState, useEffect} from "react";
import { useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import socketio from 'socket.io-client';
import Song from  "./SongInfo";


import {
    selectRoom
} from "../../redux/roomSlice"

import "../../scss/game.scss"
import "../../scss/quiz.scss"

const Game = (props)=>{
    let {id} = useParams();

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
            {socket ? <Song songs={rooms[idx].Song} socket={socket} idx={idx}/> : ""}
        </div>
    );
}


export default Game;