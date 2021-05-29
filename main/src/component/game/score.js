import React from "react";
import {useSelector} from "react-redux";

import {
    selectRoom
} from "../../redux/roomSlice"

const Score = (props)=>{

    const rooms = useSelector(selectRoom)
    const idx = props.idx



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

export default Score;