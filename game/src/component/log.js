import React, {Component} from "react";

class Log extends Component{
    constructor(props){
        super(props)

        this.logs = this.props.logs.map((chat)=>{
            let style = {color : chat.color}
            return(
                <li key={chat.username} className="chat">
                    <span style={style}>{chat.username} : </span> {chat.context}
                </li>
            )
        })

    }

    render(){
        return (
            <div className="logBox">
                <ul className="log">{this.logs}</ul>
                <button className="closeBox" onClick={this.props.closeBox}>닫기</button>
            </div>

        );
    }
}

export default Log;