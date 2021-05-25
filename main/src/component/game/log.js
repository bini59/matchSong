import React from "react";

const Log = (props)=>{
    let logs = props.logs.map((chat)=>{
        return(
            <li key={chat.username} className="chat">
                <span style={{color : chat.color}}>{chat.username} : </span> {chat.context}
            </li>
        )
    })

    return (
        <div className="logBox">
            <ul className="log">{logs}</ul>
            <button className="closeBox" onClick={props.closeBox}>닫기</button>
        </div>

    );
}

// class Log extends Component{
//     constructor(props){
//         super(props)

//         this.logs = this.props.logs.map((chat)=>{
//             let style = {color : chat.color}
//             return(
//                 <li key={chat.username} className="chat">
//                     <span style={style}>{chat.username} : </span> {chat.context}
//                 </li>
//             )
//         })

//     }

//     render(){
//         return (
//             <div className="logBox">
//                 <ul className="log">{this.logs}</ul>
//                 <button className="closeBox" onClick={this.props.closeBox}>닫기</button>
//             </div>

//         );
//     }
// }

export default Log;