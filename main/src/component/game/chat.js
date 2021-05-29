import React, {useState, useRef} from "react";
import {useDispatch} from "react-redux"
import {Link} from "react-router-dom";

import Score from "./score"


import {
    changeRoom
} from "../../redux/roomSlice"


const Chat = (props)=>{
    console.log(props)
    const [name, setName] = useState(true);
    const dispatch = useDispatch();
    //user info
    const [user, setUser] = useState({
        nickname : "bini",
        color : "red",
        score : 73,
        roomMaster : true
    })
    const [room, setRoom] = useState(props.room)
    //window input nickname
    

    const adduser = ()=>{
        let name = document.getElementById("newNickname").value;

        //when nickname exist
        if(name !== ""){
            /*
                submit name to server and receive User data and
                this.setState({
                    user : {receive user data}
                })
            */
            props.socket.emit("add-user", {
                room : room,
                username : name
            });
            props.socket.on("AddUsr", (Room)=>{
                dispatch(changeRoom({
                    title : room.title,
                    room : Room
                }))
            })
            //property function add user
            //need to Edit with redux
            setName(false);
            console.log(room)
       }
    }



    const nameWindow = (
        <div className="addUsr">
            <span className="nameInfo">닉네임 입력</span><br/>
            <input type="text" id="newNickname"/><br/>
            <button className="nameOk" onClick={adduser}>확인</button>
        </div>
    )
    const [chat, setChat] = useState([
        <span key={0}><br/></span>,
        <span key={1}><br/></span>,
        <span key={2}><br/></span>,
        <span key={3}><br/></span>,
        <span key={4}><br/></span>
    ]);
    const [count, setCount] = useState(5)

    return(
        <div>
            <Score rooms={props.room}/>
            <div className="chatBtn">
                {user.roomMaster?<button className="gameStart" onClick={props.startGame}>게임 시작</button>: ""}
                <Link to="/">
                    <button className="gameExit" onClick={()=>{
                        props.exitGame(user.nickname);
                        //go to home code
                    }}>나가기</button>
                </Link>
            </div>
            <div>
                {name ? nameWindow : ""}
                <div className="chat">{chat}</div>
                <input className="input" type="text" />
                <button onClick={()=>{
                    //from props
                    let c = {
                        color : "red",
                        nickname : "bini",
                        chat : "TEST CHAT"
                    }
                    let Chat = chat;
                    Chat.push(<span key={count} className="chatMsg"><span style={{color : c.color}}>{c.nickname}</span> : {c.chat}<br/></span>)
                    Chat.shift();
                    setCount(count+1);
                    setChat(Chat);
                }}>chatTest</button>
            </div>
        </div>
    );
}

export default Chat;