import React, {useState, useRef} from "react";
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom";
import {
    changeRooms,
    selectRoom
} from "../../redux/roomSlice"
import Selbtn from "./btn";


const Select = (props)=>{
    const dispatch = useDispatch();
    let x = useSelector(selectRoom)
    
    const [check, setCheck] = useState((''))
    let info = [useRef(), useRef()]

    console.log(props)
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

    let rooms = {
        title : "",
        users : [{
            nickname : "ㅇㅇ",
            score : 43,
            color : "red",
            roomMaster : true
        }],
        genre : [],
        songN : [0, 0],
        Song : [{
            title : "We go - 프로미스나인",
            hint : [
                {
                    category : "가수힌트",
                    context : "프로미스나인",
                    time : 55
                },
                {
                    category : "초성힌트",
                    context : "ㅇ ㄱㅇ",
                    time : 50
                }
            ],
            ans : ["we go", "위 고", "위 고우"],
            url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
            duration : 60
        }]
    }

    let genreBtns = btns.map((genre, idx)=>{
        return <Selbtn key={idx} name={genre} onselected={()=>{
            let index = rooms.genre.indexOf(genre)
            if(index >-1){rooms.genre.splice(index,1)}
            else{rooms.genre.push(genre)}
            //console.log(this.selected)
        }}/>
    });

    

    const sendServer = (room)=>{
        const recipeUrl = "https://3001-blush-wolverine-2p0rzvu8.ws-us07.gitpod.io/room/add";
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(room)
        };
        fetch(recipeUrl, requestMetadata)
        .then(res => res.json())
        .then(json=>dispatch(changeRooms(JSON.parse(json))))
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
                setCheck(
                    <Link to={{
                        pathname: "/game/"+rooms.title,
                        state: {rooms : props.rooms}
                    }}
                         room={rooms}>
                        <div className="checkMade">
                            <button className="checkBtn" onClick={()=>{
                                sendServer(rooms)
                                props.renewRooms(x);
                            }}>확인</button>
                            <button className="checkBtn" onClick={()=>{setCheck('')}}>취소</button>
                        </div>
                    </Link>
                    );
            }}>확인</button>
            {check}
            <button className="deciBtn" onClick={()=>{props.closeWindow()}}>취소</button>
        </div>
    );
}


// class Select extends Component{
//     constructor(props){
//         super(props);
//         const btns = [
//             "K-POP(2000-2005)",
//             "K-POP(2005-2010)",
//             "K-POP(2010-2015)",
//             "K-POP(2015-2021)",
//             "2세대 여자아이돌",
//             "3세대 여자아이돌",
//             "4세대 여자아이돌",
//             "롤 스킬 이펙트"
//         ]
//         this.genreBtns = btns.map((genre, idx)=>{
//             return <Selbtn key={idx} name={genre} onselected={()=>{
//                 let index = this.selected.genre.indexOf(genre)
//                 if(index >-1){this.selected.genre.splice(index,1)}
//                 else{this.selected.genre.push(genre)}
//                 //console.log(this.selected)
//             }}/>
//         });

//         this.selected = {
//             genre : []
//         }
//     }
    

//     render(){
//         return (
//             <div className="selectMode">
//                 <div className="selSection">
//                     <span>장르</span><br/>
//                     {this.genreBtns}
//                 </div>
//                 <div className="selSection">
//                     <span>방 이름</span><br/>
//                     <input className="roomNo" type="text" />
//                 </div>
//                 <div className="selSection">
//                     <span>곡 개수</span><br/>
//                     <input className="songNum" type="text" />
//                 </div>
//                 <div className="selSection">
//                     <span>닉네임</span><br/>
//                     <input className="nickname" type="text" />
//                 </div>
//                 <button className="deciBtn" id="accept">확인</button>
//                 <button className="deciBtn" onClick={()=>{this.props.closeWindow()}}>취소</button>
//             </div>
//         );   
//     }   
// }

export default Select;