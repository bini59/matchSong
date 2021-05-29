import React, {useState, useRef, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom";

import {
  selectRoom
} from "../redux/roomSlice"

const Game = ()=>{
    const dispatch = useDispatch();

    // Trigger of chat log
    const [logTrigger, setTrigger] = useState(false)
    // get Room list from redux Store 
    // first get from Store
    // rooms = []
    const rooms = useSelector(selectRoom)
    // id of parameter (room name)
    const {id} = useParams();

    let idx = rooms.findIndex(i=> i.title === id);


    const songInfo = (room)=>{
      
    }

    
}