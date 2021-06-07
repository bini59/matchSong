import React, { useState, useEffect } from 'react';
import Select from "./select";
import {Link} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux"
import {
  selectRooms,
  changeRooms
} from "../../redux/roomSlice"

import "../../scss/app.scss";
import "../../scss/select.scss"

//Genres
const Genres = [
  "JPOP",
  "애니(노래이름)",
  "애니(애니이름)",
  "캐릭터송(캐릭터)",
  "여돌(~2020)"
]



const Main = (props)=>{
    const dispatch = useDispatch();
    // get Room list from redux Store 
    // first get from Store
    // rooms = []
    const rooms = useSelector(selectRooms)
	
	// fetch rooms from server
	// when room dispatched, This effect run
	useEffect(()=>{
		const recipeUrl = "https://3001-orange-vicuna-9uo5wxk0.ws-us08.gitpod.io/room";
		const requestMetadata = {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({})
		};
		//rendering Main
		fetch(recipeUrl, requestMetadata).then(res => res.json())
		.then(json => dispatch(changeRooms(JSON.parse(json).rooms)))
    }, [dispatch])

    // For select on/off
    const [onSelect, setSelect] = useState(false);

    // Construct room list with (rooms)
	// Rooms => room list
	// room  => item of Rooms
    const roomList = (Rooms) => {return Rooms.map((room)=>{
      let to = {
        pathname : "/game/" + room.title,
        state : {rooms : Rooms}
      }
      return (
		//key room title => not allow same room name 
        <li key={room.title} className="roomli">
          <Link to={to}>
            <div className="room">
              <div className="title">{room.title}</div>
              <div className="genre">[{room.genre.map((genre, t)=>{return(<span key={t}>{genre > 0 ? Genres[t]+"," : ""} </span>)})}]</div><br></br>
              <div className="users">{room.users.map((user)=>{return('ጿ')})}</div>
              <div className="remainsong">{room.songN[1]-room.songN[0]}/{room.songN[1]}</div>
            </div>
          </Link>
        </li>
      )
    })};


    return (
        <div className="main" >
          <div id="mainTitle"><span>노래 맞추기</span></div>
          <div className="roomlist">
		    <ul>
        {/* list of room */}
			  {roomList(rooms)}
			  <li className="roomli" onClick={()=>{setSelect(true)}}><div className="addroom">+</div></li>
		    </ul>
          </div><br/>
          {onSelect ? <Select closeWindow={()=>{setSelect(false)}}/> : ''}
        </div>
    )
}

export default Main;