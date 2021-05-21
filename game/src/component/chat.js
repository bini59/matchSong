import React, {Component} from "react";


class Chat extends Component{
    constructor(props){
        super(props)
        this.state = {
            name : "TEST"
        }
    }
    render(){
        return(
            <div className="chat">
                <span>{this.state.name} : ㅁㄴㅇㄹ?</span><br/>
                <span>{this.state.name} : ㅁㄴㅇㄹ?</span><br/>
                <span>{this.state.name} : ㅁㄴㅇㄹ?</span><br/>
                <span>{this.state.name} : ㅁㄴㅇㄹ?</span><br/>
                <span>{this.state.name} : ㅁㄴㅇㄹ?</span><br/>
                <span>{this.state.name} : ㅁㄴㅇㄹ?</span>
            </div>
        );
    }
}

export default Chat;