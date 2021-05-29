import React, {useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom";

import $ from "jquery"

import Score from "./score"


import {
    selectRoom,
    changeRoom
} from "../../redux/roomSlice"

const Message = (props)=>{

    const chatt = useRef()

    useEffect(()=>{
        props.socket.on("send-chat-server", (data)=>{
            chatt.current.innerHTML += `
                <span className="chatMsg">
                    <span style="color : ${data.user.color}">
                        ${data.user.nickname}
                    </span> 
                    : ${data.chat}<br/>
                </span>
            `
            $(".chat")[0].scrollTop = chatt.current.scrollHeight
        })
    }, [props.socket])

    const sendMsg = ()=>{
        let input = document.getElementsByClassName("input")[0]
        props.socket.emit("send-chat-client", {
            user : props.user,
            chat : input.value,
            title : props.title
        })
        input.value = "";
    }

    return (
        <div>
            <div className="chat" style={{overflow:"auto"}} ref={chatt}></div>
            <input className="input" type="text" onKeyDown={(e)=>{if(e.key==="Enter"){sendMsg()}}}/>
            <button onClick={sendMsg}>chatTest</button>
        </div>
    )
}



const Chat = (props)=>{
    
    const dispatch = useDispatch();
    //user info
    const [user, setUser] = useState({
        nickname : "NONE",
        color : "red",
        score : 73,
        roomMaster : true
    })

    const rooms = useSelector(selectRoom)
    const idx = props.idx;

    const [test, setTest] = useState(false)

    useEffect(()=>{
        props.socket.emit("join-room", {title : rooms[idx].title})
    }, [])

    useEffect(()=>{
        if(test){
            let Name = document.getElementById("newNickname").value;
            props.socket.on("AddUsr", (Room)=>{
                dispatch(changeRoom({
                    title : rooms[idx].title,
                    room : Room
                }))
                if(Name === Room.users[Room.users.length-1].nickname){
                    setUser(Room.users[Room.users.length-1])
                }
            })
            //when nickname exist
            if(Name !== ""){
                props.socket.emit("add-user", {
                    room : rooms[idx],
                    username : Name
                });
            }
            return ()=>{
                props.socket.emit("remove-user",{
                    room : rooms[idx],
                    username : Name
                })
                props.socket.disconnect()
            }

        }

    }, [test])

    useEffect(()=>{
        props.socket.on("remove-user", (Room)=>{
            dispatch(changeRoom({
                title : rooms[idx].title,
                room : Room
            }))
        })
    })


    const nameWindow = (
        <div className="addUsr">
            <span className="nameInfo">닉네임 입력</span><br/>
            <input type="text" id="newNickname"/><br/>
            <button className="nameOk" onClick={()=>{setTest(true)}}>확인</button>
        </div>
    )


    return(
        <div>
            <Score idx={idx}/>
            <div className="chatBtn">
                {user.roomMaster?<button className="gameStart" onClick={()=>{}}>게임 시작</button>: ""}
                <Link to="/">
                    <button className="gameExit" onClick={()=>{
                        props.exitGame(user.nickname);
                        //go to home code
                        props.socket.disconnect();
                    }}>나가기</button>
                </Link>
            </div>
            {user.nickname === "NONE" ? nameWindow : ""}
            <div>
                <Message socket={props.socket} user={user} title={rooms[idx].title}/>
            </div>
        </div>
    );
}

export default Chat;