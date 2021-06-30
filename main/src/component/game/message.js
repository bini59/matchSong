import {useRef, useEffect} from "react";

import $ from "jquery"

const Message = (props)=>{

    const chatt = useRef()

    const room = props.room
    const socket = props.socket

    useEffect(()=>{
        $("#totalUsr")[0].innerHTML = room.users.length
        socket.off("skipped");
        socket.on("skipped", (data)=>{
            $(".chat")[0].innerHTML += `<span><span style="color:red">!</span> 스킵하셨습니다</span></br>`        
            $(".chat")[0].scrollTop = $(".chat")[0].scrollHeight;
            props.timerOff();
            if(props.user.roomMaster)
                socket.emit("req-start-game", {
                    title : room.title,
                    idx : props.idx,
                    first : 0
                })
        })
    }, [room])

    useEffect(()=>{
        socket.on("notice-skip", (data)=>{
            console.log($("#skipProgress"))
            $("#skipProgress")[0].innerHTML = data.num;
        })


    }, [])

    const sendMsg = ()=>{
        let input = document.getElementsByClassName("input")[0]
        socket.emit("send-chat", {
            user : props.user,
            chat : input.value,
            title : room.title,
            idx : props.idx
        })
        input.value = "";
    }

    const skip = ()=>{
        socket.emit("vote-skip", {
            user : props.user,
            title : room.title,
            idx : props.idx,
        })
    }

    return (
        <div>
            <div className="chat" style={{overflow:"auto"}} ref={chatt}></div>
            <input className="input" type="text" onKeyDown={(e)=>{
                if(e.key==="Enter"){sendMsg()}
                else if(e.ctrlKey===true && e.code ==="Slash" ){skip()}
            }}/>
            <button className="skipBtn" onClick={()=>{skip()}}>스킵</button>
            <div className="skip">스킵에 투표하시려면 ctrl+/를 누르세요 ( <span id="skipProgress">0</span> / <span id="totalUsr"></span> )</div>
        </div>
    )
}


export default Message;