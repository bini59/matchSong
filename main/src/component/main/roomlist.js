import {Link} from "react-router-dom";

//Genres
const Genres = [
    "JPOP",
    "애니(노래이름)",
    "애니(애니이름)",
    "캐릭터송(캐릭터)",
    "여돌(~2020)"
]  

const roomList = (props)=>{
    let rooms = props.rooms
    let roomlink = {
        pathname : "/game/",
        state : {rooms : rooms}
    }
    let jsxRoomList = rooms.map((room)=>{
        roomlink.pathname = `/game/${room.title}`
        return (
            <li key={room.title} className="roomli">
                <Link to={roomlink}>
                    <div className="room">
                        <div className="title">{room.title}</div>
                        <div className="genre">[{room.genre.map((genre, t)=>{return(<span key={t}>{genre > 0 ? Genres[t]+"," : ""} </span>)})}]</div><br></br>
                        <div className="users">{room.users.map((user)=>{return('ጿ')})}</div>
                        <div className="remainsong">{room.songN[1]-room.songN[0]}/{room.songN[1]}</div>
                    </div>
                </Link>
            </li>
        )
    })



    return (
        <ul>
            {jsxRoomList}
            <li className="roomli" onClick={()=>{props.Select()}}><div className="addroom">+</div></li>
        </ul>
    )
}

export default roomList;