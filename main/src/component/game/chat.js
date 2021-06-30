import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux"
import {Link} from "react-router-dom";

import $ from "jquery"

import Score from "./score"
import Message from "./message"

import {
    changeRoom
} from "../../redux/roomSlice"



const Chat = (props)=>{
    
    const dispatch = useDispatch();
    //user info
    const [user, setUser] = useState({
        nickname : "NONE",
        color : "red",
        score : 0,
        roomMaster : true
    })

    const idx = props.idx;
    const room = props.room

    // For Add user
    const [usr, setUsr] = useState(false)
    const [name, setName] = useState("")

    useEffect(()=>{
        props.socket.emit("join-room", {title : room.title})

        props.socket.on("correct", (data)=>{
            props.correct();
            $(".chat")[0].innerHTML += `<span><span style="color :#15f7f7">◆</span><span style="color : ${data.user.color}; font-weigth:bold">${data.user.nickname}</span><span> 정답입니다</span></span></br>`        
            $(".chat")[0].scrollTop = $(".chat")[0].scrollHeight;
            dispatch(changeRoom({
                title : room.title,
                room : data.room
            }))      
        })
    }, [])

    useEffect(()=>{
        props.socket.off("res-add-user")
        // add user and remove user
        props.socket.on("res-add-user", (Room)=>{
            // rendering Game
            dispatch(changeRoom({
                title : room.title,
                room : Room
            }))
            if(Room.users[Room.users.length-1].nickname === name)
                setUser(Room.users[Room.users.length-1])
        })
    }, [name])

    // socket on
    useEffect(()=>{
        props.socket.on("remove-user", (Room)=>{
            // rendering Game
            dispatch(changeRoom({
                title : room.title,
                room : Room
            }))
        })

        // Receive chat from server
        props.socket.on("receive-chat", (data)=>{
            $(".chat")[0].innerHTML += `
                <span className="chatMsg">
                    <span style="color : ${data.user.color}">
                        ${data.user.nickname}
                    </span> 
                    : ${data.chat}<br/>
                </span>
            `
            $(".chat")[0].scrollTop = $(".chat")[0].scrollHeight
        })
        
        props.socket.on("end-game", (data)=>{
          dispatch(changeRoom({
              title : room.title,
              room : data.room
          }))  
        })

    }, [])




    // Add user
    useEffect(()=>{
        if(usr){
            let Name =$("#newNickname")[0].value;
            setName(Name)
            // when nickname exist
            // add user
            if(Name !== ""){
                props.socket.emit("req-add-user", {
                    room : room,
                    username : Name
                });
            }
            // function of clean up
            // when Chat unmount, remove user from server
            return ()=>{
                props.socket.emit("remove-user",{
                    room : room,
                    username : name
                })
                props.socket.disconnect()
            }

        }
    }, [usr])

    useEffect(()=>{
        props.socket.off("res-start-game")
        // start game
        props.socket.on("res-start-game", (data)=>{
            props.FuncstartGame(room);
        })
    }, [room])

    useEffect(()=>{
        if(props.time===0){
            props.correct();
        }
        if(props.time===0 && user.roomMaster){
            
            props.socket.emit("req-start-game", {
                title : room.title,
                idx : idx,
                first : 0
            })
        }
    }, [props.time])


    const nameWindow = (
        <div className="addUsr">
            <span className="nameInfo">닉네임 입력</span><br/>
            <input type="text" id="newNickname"/><br/>
            <button className="nameOk" onClick={()=>{setUsr(true)}}>확인</button>
        </div>
    )


    return(
        <div className="chatBox">
            <Score room={props.room} idx={idx}/>
            <div className="chatBtn">
                {user.roomMaster?<button className="gameStart" onClick={()=>{
                    props.startGame()
                    $('.gameStart')[0].style="display:none";
                }}>게임 시작</button>: ""}
                <Link to="/">
                    <button className="gameExit" onClick={()=>{props.socket.disconnect()}}>나가기</button>
                </Link>
            </div>
            {user.nickname === "NONE" ? nameWindow : ""}
            <div>
                <Message 
                    socket={props.socket} 
                    user={user} 
                    idx={idx}
                    room={room} 
                    timerOff={()=>{
                        props.timerOff()
                        props.correct()
                    }}
                />
            </div>
        </div>
    );
}

export default Chat;