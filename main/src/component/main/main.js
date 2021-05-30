import React, { useState, useEffect } from 'react';
import Select from "./select";
import {Link} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux"
import {
  selectRoom,
  changeRooms
} from "../../redux/roomSlice"

import "../../scss/app.scss";
import "../../scss/select.scss"


const Main = (props)=>{
    const dispatch = useDispatch();
    // get Room list from redux Store 
    // first get from Store
    // rooms = []
    const rooms = useSelector(selectRoom)

    // For select on/off
    const [onSelect, setSelect] = useState(false);

    // Construct room list with (rooms)
    const roomList = (Rooms) => {return Rooms.map((room)=>{
      let to = {
        pathname : "/game/" + room.title,
        state : {rooms : Rooms}
      }
      return (
        <li key={room.title} className="roomli">
          <Link to={to}>
            <div className="room">
              <div className="title">{room.title}</div>
              <div className="genre">[{room.genre.map((genre, t)=>{return(<span key={t}>{genre}, </span>)})}]</div><br></br>
              <div className="users">{room.users.map((user)=>{return('ጿ')})}</div>
              <div className="remainsong">{room.songN[1]-room.songN[0]}/{room.songN[1]}</div>
            </div>
          </Link>
        </li>
      )
    })};

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
      fetch(recipeUrl, requestMetadata).then(res => res.json())
      .then(json => dispatch(changeRooms(JSON.parse(json).rooms)))
    }, [dispatch])


    return (
        <div className="main" >
        <div id="mainTitle"><span>노래 맞추기</span></div>
        <div className="roomlist">
              <ul>
                {roomList(rooms)}
                <li className="roomli" onClick={()=>{setSelect(true)}}><div className="addroom">+</div></li>
              </ul>
        </div><br/>
        {onSelect ? <Select 
          closeWindow={()=>{setSelect(false)}}
          renewRooms={(roomlist)=>{roomList(roomlist)}}
        /> : ''}
      </div>
    )
  }

export default Main;