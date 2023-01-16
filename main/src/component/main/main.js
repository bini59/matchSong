import React, { useState, useEffect } from 'react';
import Select from "./select";
import Roomlist from "./roomlist"

import {useSelector, useDispatch} from "react-redux"
import {
  selectRooms,
  changeRooms
} from "../../redux/roomSlice"

import "../../scss/app.scss";
import "../../scss/select.scss"


const Main = (props)=>{
    const dispatch = useDispatch();
    // get Room list from redux Store 
    // first get from Store
    // rooms = []
  const rooms = useSelector(selectRooms)
	
	// fetch rooms from server
	// when room dispatched, This effect run
	useEffect(()=>{
      const recipeUrl = "/room";
      const requestMetadata = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({})
      };
	  	//rendering Main
      fetch(recipeUrl, requestMetadata)
      .then(res => res.json())
      .then(json => dispatch(changeRooms(JSON.parse(json).rooms)))
  }, [dispatch])

    // For select on/off
    const [onSelect, setSelect] = useState(false);


    return (
        <div className="main" >
          <div id="mainTitle"><span>노래 맞추기</span></div>
          <div className="roomlist">
            <Roomlist
              Select = {()=>{setSelect(true)}}
              rooms = {rooms}
            />
          </div><br/>
          {onSelect ? <Select closeWindow={()=>{setSelect(false)}}/> : ''}
        </div>
    )
}

export default Main;