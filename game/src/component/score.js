import React, {Component} from "react";

class Score extends Component{
    constructor(props){
        super(props);
        
        this.users = this.props.users;
        this.users.sort((a, b)=>{
            return b.score - a.score;
        })
    }

    render(){
        return(
            <div className="scoreBoard">
                <ul className="li">
                    {this.users.map((user)=>{
                        let style={backgroundColor : user.color};
                        return(
                            <li className="Scoreli">
                                <div style={style}/><span> {user.score}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Score;