import React, {useState, useRef} from "react";
import {useDispatch} from "react-redux"
import {
    changeRooms
} from "../../redux/roomSlice"
import Selbtn from "./btn";


const Select = (props)=>{
    const dispatch = useDispatch();
    
	// final check that make a room
    const [check, setCheck] = useState((''))
	// room info selector
    let info = [useRef(), useRef()]

    //Genres
    const btns = [
        "K-POP(2000-2005)",
        "K-POP(2005-2010)",
        "K-POP(2010-2015)",
        "K-POP(2015-2021)",
        "2세대 여자아이돌",
        "3세대 여자아이돌",
        "4세대 여자아이돌",
        "롤 스킬 이펙트"
    ]
	
	// initial room state
    let rooms = {
        title : "",
        users : [],
        genre : [],
        songN : [0, 0],
        Song : []
    }
	
	// genre btns
	// when click genre, genre is added room
	// when genre added room, click genre, genre removed room
    let genreBtns = btns.map((genre, idx)=>{
        return <Selbtn key={idx} name={genre} onselected={()=>{
            let index = rooms.genre.indexOf(genre)
            if(index >-1){rooms.genre.splice(index,1)}
            else{rooms.genre.push(genre)}
            //console.log(this.selected)
        }}/>
    });

    
	// when Add room=> dispatch room
    const sendServer = (room)=>{
        const recipeUrl = "https://3001-orange-vicuna-9uo5wxk0.ws-us08.gitpod.io/room/add";
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(room)
        };
		
		// rendering Main
        fetch(recipeUrl, requestMetadata)
        .then(res => res.json())
        .then(json=>dispatch(changeRooms(JSON.parse(json).rooms)))
    }

    return (
        <div className="selectMode">
            <div className="selSection">
                <span>장르</span><br/>
                {genreBtns}
            </div>
            <div className="selSection">
                <span>방 이름</span><br/>
                <input className="roomNo" type="text" ref={info[0]}/>
            </div>
            <div className="selSection">
                <span>곡 개수</span><br/>
                <input className="songNum" type="text" ref={info[1]}/>
            </div>
            <button className="deciBtn" id="accept" onClick={()=>{
                rooms.title = info[0].current.value;
                rooms.songN[1] = info[1].current.value;
				//create Check window and send room data to server
                setCheck(
					<div className="checkMade">
						<span>정말로 생성하시겠습니까?</span>
						<button className="checkBtn" onClick={()=>{
							sendServer(rooms)
							// randering Main
							props.renewRooms();
							setCheck('');
							props.closeWindow()
						}}>확인</button>
						<button className="checkBtn" onClick={()=>{setCheck('')}}>취소</button>
					</div>
				);
            }}>확인</button>
            {check}
            <button className="deciBtn" onClick={()=>{props.closeWindow()}}>취소</button>
        </div>
    );
}
export default Select;