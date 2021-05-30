import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import ReactAudioPlayer from "react-audio-player"
import $ from "jquery"

import Chat from "./chat"

import {
    selectRoom
} from "../../redux/roomSlice"


const useTimer = (props)=>{
    const [sec, setSec] = useState(5000);

    const idx = props.idx

    useEffect(()=>{
        setSec(props.rooms[idx].Song[props.songIdx].duration)
    }, [props.onTimer])

    useEffect(()=>{
        if(props.onTimer){
            const countdown = setInterval(()=>{
                if(sec > 0) setSec(sec-1)
                else {

                    clearInterval(countdown)
                }
            }, 1000)
    
            return ()=>{
                clearInterval(countdown)
            }
        }
    })

    return sec;
}

//show hint
const Hint = (props)=>{
    const [hintN, setHintN] = useState(0);
    const [hint, setHint] = useState([])

    useEffect(()=>{
        setHintN(0)
    }, [props.hints])

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

    //Answer show trigger
    const [ansState, setAnstrigger] = useState(false);
    //Answer
    const [ans, setAns] = useState(<div className="ans"><span className="ansMsg">답</span> : {rooms[idx].Song[rooms[idx].songN[0]].title}</div>)
    //ontimer
    const [onTimer, setTimer] = useState(false);

    let temp = useTimer({rooms : rooms, idx : idx, songIdx : rooms[idx].songN[0], onTimer:onTimer, socket:props.socket});
    let song = document.getElementById("audio");
    

    useEffect(()=>{
        props.socket.on("skipped", (data)=>{
            setTimer(false)
            if(!ansState) {
                props.socket.emit("send-chat-client", {
                    user : {nickname : "UNDEFINE"},
                    chat : rooms[idx].Song[rooms[idx].songN[0]].ans[0],
                    title : rooms[idx].title,
                    idx : idx
                })
            }
            {song ? song.pause() : song = document.getElementById("audio")}
            song.src = rooms[idx].Song[rooms[idx].songN[0]].url
            setTimeout(()=>{
                setAnstrigger(false);
                $(".hint")[0].innerHTML = "";
                $("#skipProgress")[0].innerHTML = 0;
                song.play()
                setTimer(true)
                setSongT(true)
                props.socket.emit("start-game", {room : rooms[idx].title})
                
            }, 4000)
        })
    }, [rooms])

    const [songT, setSongT] = useState(true)
    //일단 기달려 이거 굉장히 잘못되었어....
    useEffect(()=>{
        if(song){
            if(song.played && song.currentTime > 0 && songT){
                setAns(<div className="ans"><span className="ansMsg">답</span> : {rooms[idx].Song[rooms[idx].songN[0]].title}</div>); console.log(ans)
                setSongT(false);
            }
        }
        if(temp === 0){
            setTimer(false)
            if(!ansState) {
                props.socket.emit("send-chat-client", {
                    user : {nickname : "UNDEFINE"},
                    chat : rooms[idx].Song[rooms[idx].songN[0]].ans[0],
                    title : rooms[idx].title,
                    idx : idx
                })
            }
            {song ? song.pause() : song = document.getElementById("audio")}
            song.src = rooms[idx].Song[rooms[idx].songN[0]].url
            setTimeout(()=>{
                setAnstrigger(false);
                $(".hint")[0].innerHTML = "";
                $("#skipProgress")[0].innerHTML = 0;
                song.play()
                setTimer(true)
                setSongT(true)
                props.socket.emit("start-game", {room : rooms[idx].title})
                
            }, 4000)
        }
    }, [temp]);
    
    return(
        <div className="quiz">
            <div className="temp">
                <div className="title">
                    <span className="remainSong">남은곡 ( {rooms[idx].songN[1]-rooms[idx].songN[0]} / {rooms[idx].songN[1]} )</span><br/>
                    <span className="description"><span className="_1">음악</span>을 듣고 <span className="_2">답</span>을 입력하세요</span><br/>
                    <span className="remainSec">- {temp}초 -</span><br/>
                    <ReactAudioPlayer 
                        src={rooms[idx].Song[rooms[idx].songN[0]].url}
                        id="audio"
                        type="mpeg"
                        onLoadedMetadata={()=>{song = document.getElementById("audio")}}
                    />
                </div>
                <div className="hint">
                    <Hint 
                        sec={temp}
                        hints={rooms[idx].Song[rooms[idx].songN[0]].hint}
                    />
                </div>
                {ansState ? ans : <div className="ans"></div>}
            </div>
            <Chat 
                room={props.room}
                socket={props.socket} 
                idx={idx} 
                correct={()=>{
                    setAnstrigger(true)
                }}
                startGame={()=>{
                    setTimer(true);
                    song.play();
                }}
                />

        </div>
    );
}


export default Song;