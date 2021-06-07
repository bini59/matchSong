import React, {useState, useRef, useEffect} from "react";
import {useDispatch} from "react-redux"
import {
    changeRooms
} from "../../redux/roomSlice"


const Select = (props)=>{
    const dispatch = useDispatch();
    
	// final check that make a room
    const [check, setCheck] = useState((''))
	// room info selector
    let info = [useRef(), useRef()]

    // For input genres
    const [genre, setGenre] = useState('');

    const maxNum = async (genre)=>{
        const recipeUrl = "https://3001-orange-vicuna-9uo5wxk0.ws-us08.gitpod.io/room/genres";
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(genre)
        };
        
        // rendering Main
        let res = await fetch(recipeUrl, requestMetadata)
        let json = await res.json()
        let genreNum = JSON.parse(json)["genre"]

        
        setGenre(Genres.map((genre, idx)=>{
            return (
                <div key={idx} className="genreSel">
                    <span className="genreName">{genre} : </span>
                    <input className="genreInput" id={genre} />
                    <span> (max : {genreNum[idx]})</span>
                </div>
                
            )
        }))
    }

    
    //Genres
    const Genres = [
        "JPOP",
        "애니(노래이름)",
        "애니(애니이름)",
        "캐릭터송(캐릭터)",
        "여돌(~2020)"
    ]
	
    useEffect(()=>{
        maxNum({genre : Genres})
    }, [])

	// initial room state
    let rooms = {
        title : "",
        users : [],
        genre : [],
        songN : [0, 0],
        Song : []
    }
	

    
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
                <span>방 이름 : </span><input className="roomNo" type="text" ref={info[0]}/>
            </div>
            <div className="selSection">
                <span>장르</span><br/>
                {genre}
            </div>
            <button className="deciBtn" id="accept" onClick={()=>{
                rooms.title = info[0].current.value;
                let n = 0
                Genres.map((g, idx)=>{
                    rooms.genre.push(document.getElementsByClassName("genreInput")[idx].value)
                    if(rooms.genre[idx] === "") rooms.genre[idx] = 0
                    n += Math.ceil(rooms.genre[idx])
                    return idx
                })
                rooms.songN[1] = n;
				//create Check window and send room data to server
                setCheck(
					<div className="checkMade">
						<span>정말로 생성하시겠습니까?</span><br/>
						<button className="checkBtn" onClick={()=>{
							sendServer(rooms)
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