import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux"
import ReactAudioPlayer from "react-audio-player"

import Chat from "./chat"

import {
    selectRoom
} from "../../redux/roomSlice"


const Timer = (props)=>{
    const [sec, setSec] = useState(props.duration);

    useEffect(()=>{
        if(props.onTimer){
            const countdown = setInterval(()=>{
                if(sec > 0) setSec(sec-1)
                else clearInterval(countdown)
            }, 1000)
    
            return ()=>{clearInterval(countdown)}
        }
    })

    return sec;
}

//show hint
const Hint = (props)=>{
    const [hintN, setHintN] = useState(0);
    const [hint, setHint] = useState([])

    useEffect(()=>{
        if(props.sec === props.hints[hintN].time){
            setHint(()=>{
                hint.push(
                    <div key={props.hints[hintN].time}>
                        <span className="hintMsg">{props.hints[hintN].category} : </span>
                        <span>{props.hints[hintN].context}</span>
                    </div>
                )
                return hint
            })
            if(hintN < props.hints.length-1){
                setHintN(hintN+1);
            }
        }
    }, [props.sec, hint, hintN, props.hints])

    return hint;
}


const Song = (props)=>{

    // room
    const rooms = useSelector(selectRoom)
    const idx = props.idx

    //current Song number
    const [songNum, setSongnum] = useState(0);
    //Answer show trigger
    const [ansState, setAnstrigger] = useState(false);
    //Answer
    const [ans, setAns] = useState(<div className="ans"><span className="ansMsg">답</span> : {rooms[idx].Song[songNum].title}</div>)
    //ontimer
    const [onTimer, setTimer] = useState(false);

    let temp = Timer({duration : props.songs[songNum].duration, onTimer:onTimer});
    let song = document.getElementById("audio");


    //일단 기달려 이거 굉장히 잘못되었어....
    useEffect(()=>{
        if(temp === 0){
            if(!ansState) setAnstrigger(true);
            {song ? song.pause() : song = document.getElementById("audio")}
            if(songNum < props.songs.length-1){
                setSongnum(songNum+1);
                song.src = props.songs[songNum].url;
                setAnstrigger(false);
                setAns(<div className="ans"><span className="ansMsg">답</span> : {props.songs[songNum].title}</div>)
            }
        }
    }, [temp, ansState, props.songs, song, songNum]);
    
    return(
        <div className="quiz">
            <div className="temp">
                <div className="title">
                    <span className="remainSong">남은곡 ( 100 / 100 )</span><br/>
                    <span className="description"><span className="_1">음악</span>을 듣고 <span className="_2">답</span>을 입력하세요</span><br/>
                    <span className="remainSec">- {temp}초 -</span><br/>
                    <ReactAudioPlayer 
                        src={props.songs[0].url ? props.songs[0].url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap"}
                        id="audio"
                        type="mpeg"
                        onLoadedMetadata={()=>{song = document.getElementById("audio")}}
                    />
                </div>
                <div className="hint">
                    <Hint 
                        sec={temp}
                        hints={props.songs[songNum].hint}
                    />
                </div>
                {ansState ? ans : <div className="ans"></div>}
            </div>
            <Chat room={props.room} socket={props.socket} idx={idx}/>
            <button onClick={()=>{
                setTimer(true);
                song.play();
            }}>뭐지 이거 맞나?</button>
        </div>
    );
}


export default Song;