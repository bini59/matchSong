import React from "react";

const Score = (props)=>{

    let users = props.room.users.slice(0).sort((a, b)=>{
        return b.score - a.score;
    });

    let score = users.map((user)=>{
        return(
            <li key={user.nickname} className="Scoreli">
                <div className="scoreColor" style={{backgroundColor : user.color}}/>
                <div className="score"> {user.score}</div>
            </li>
        );
    })

    return(
        <div className="scoreBoard">
            <ul className="li">{score}</ul>
        </div>
    );
}

export default Score;