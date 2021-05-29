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
    console.log(props)
    const [chat, setChat] = useState([
        <span key={0}><br/></span>,
        <span key={1}><br/></span>,
        <span key={2}><br/></span>,
        <span key={3}><br/></span>,
        <span key={4}><br/></span>
    ])

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
            console.log(chatt.current.scrollHeight)
            $(".chat")[0].scrollTop = chatt.current.scrollHeight
        })
    }, [])

    const sendMsg = ()=>{
        let input = document.getElementsByClassName("input")[0]
        props.socket.emit("send-chat-client", {
            user : props.user,
            chat : input.value
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
    const [name, setName] = useState(true);
    const dispatch = useDispatch();
    //user info
    const [user, setUser] = useState({
        nickname : "NONE",
        color : "red",
        score : 73,
        roomMaster : true
    })
    const [chat, setChat] = useState([
        <span key={0}><br/></span>,
        <span key={1}><br/></span>,
        <span key={2}><br/></span>,
        <span key={3}><br/></span>,
        <span key={4}><br/></span>
    ]);

    const [t, forceupdate] = useState(0)

    const rooms = useSelector(selectRoom)
    const idx = props.idx;
    

    const adduser = ()=>{
        let Name = document.getElementById("newNickname").value;

        //when nickname exist
        if(Name !== ""){
            props.socket.emit("add-user", {
                room : rooms[idx],
                username : Name
            });
            props.socket.on("AddUsr", (Room)=>{
                dispatch(changeRoom({
                    title : rooms[idx].title,
                    room : Room
                }))
                console.log(Room)
                if(Name === Room.users[Room.users.length-1].nickname){
                    setUser(Room.users[Room.users.length-1])
                }
            })
       }
    }

    const nameWindow = (
        <div className="addUsr">
            <span className="nameInfo">닉네임 입력</span><br/>
            <input type="text" id="newNickname"/><br/>
            <button className="nameOk" onClick={adduser}>확인</button>
        </div>
    )


    return(
        <div>
            <Score idx={idx}/>
            <div className="chatBtn">
                {user.roomMaster?<button className="gameStart" onClick={props.startGame}>게임 시작</button>: ""}
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
                <Message socket={props.socket} user={user}/>
            </div>
        </div>
    );
}

export default Chat;