import React from "react";

const Score = (props)=>{
    let users = props.users;
    users.sort((a, b)=>{
        return b.score - a.score;
    });

    return(
        <div className="scoreBoard">
            <ul className="li">
                {users.map((user)=>{
                    return(
                        <li key={user.score} className="Scoreli">
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