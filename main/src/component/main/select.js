import React, {useRef} from "react";
import {Link} from "react-router-dom";
import Selbtn from "./btn";

const Select = (props)=>{

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
        users : [],
        genre : [],
        Song : [0, 0]
    }

    let genreBtns = btns.map((genre, idx)=>{
        return <Selbtn key={idx} name={genre} onselected={()=>{
            let index = rooms.genre.indexOf(genre)
            if(index >-1){rooms.genre.splice(index,1)}
            else{rooms.genre.push(genre)}
            //console.log(this.selected)
        }}/>
    });

    let info = [
        useRef(), useRef()
    ]

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
            <Link to="/game">
            <button className="deciBtn" id="accept" onClick={()=>{
                rooms.title = info[0].current.value;
                rooms.Song[1] = info[1].current.value;
                props.addRoom(rooms)
                props.closeWindow();
            }}>확인</button>
            </Link>
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