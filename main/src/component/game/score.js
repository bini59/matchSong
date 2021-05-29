import React from "react";
import {useSelector} from "react-redux";

import {
    selectRoom,
    changeRoom
} from "../../redux/roomSlice"

const Score = (props)=>{

    const rooms = useSelector(selectRoom)
    const idx = props.idx


    
    // const songInfos = (room)=>{
    //     let info = {
    //         users : [],
    //         Song :  [{title : "", duration : 0, url: false, hint : [{category : "", context : "", time : 0}], ans : [""]}],
    //         title : "",
    //         genre : "",
    //         songN : [0, 0]
    //     }
    //     if (room){
    //         info.users = room.users;
    //         info.Song = room.Song;
    //         info.title = room.title;
    //         info.genre = room.genre;
    //         info.songN = room.songN;
    //     }
    //     return info
    // }

    let users = rooms[idx].users.slice(0).sort((a, b)=>{
        return b.score - a.score;
    });


    return(
        <div className="scoreBoard">
            <ul className="li">
                {users.map((user)=>{
                    return(
                        <li key={user.nickname} className="Scoreli">
                            <div className="scoreColor" style={{backgroundColor : user.color}}/>
                            <div className="score"> {user.score}</div>
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