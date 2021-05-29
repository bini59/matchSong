import React from "react";
import {useSelector} from "react-redux"

import{
    
} from "../../redux/roomSlice"

const Score = (props)=>{
    let room = props.room
    
    const songInfos = (room)=>{
        let info = {
            users : [],
            Song :  [{title : "", duration : 0, url: false, hint : [{category : "", context : "", time : 0}], ans : [""]}],
            title : "",
            genre : "",
            songN : [0, 0]
        }
        if (room){
            info.users = room.users;
            info.Song = room.Song;
            info.title = room.title;
            info.genre = room.genre;
            info.songN = room.songN;
        }
        return info
    }
    let users = songInfos(room).users
    users.sort((a, b)=>{
        return b.score - a.score;
    });

    console.log(props)

    return(
        <div className="scoreBoard">
            <ul className="li">
                {users.map((user)=>{
                    return(
                        <li key={user.nickname} className="Scoreli">
                            <div style={{backgroundColor : user.color}}/><span> {user.score}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

// class Score extends Component{
//     constructor(props){
//         super(props);
        
//         this.users = this.props.users;
//         this.props.users.sort((a, b)=>{
//             return b.score - a.score;
//         });
        
//     }

//     render(){
//         return(
//             <div className="scoreBoard">
//                 <ul className="li">
//                     {this.users.map((user)=>{
//                         let style={backgroundColor : user.color};
//                         return(
//                             <li key={user.score} className="Scoreli">
//                                 <div style={style}/><span> {user.score}</span>
//                             </li>
//                         );
//                     })}
//                 </ul>
//             </div>
//         );
//     }
// }

export default Score;