import React, {Component} from "react";
import Input from "./input"
import Chat from "./chat"


class Song extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }
    render(){
        return(
            <div className="quiz">
                <div className="temp">
                    <div className="title">
                        <span className="remainSong">남은곡 ( 100 / 100 )</span><br/>
                        <span className="description"><span className="_1">음악</span>을 듣고 <span className="_2">답</span>을 입력하세요</span><br/>
                        <span className="remainSec">- 60초 -</span>
                    </div>
                    <div className="hint">
                        <span className="hintMsg">가수힌트</span> : ㅇㅇㅇㅇ<br/>
                        <span className="hintMsg">초성힌트</span> : ㅁㄴㅇㄹ
                    </div>
                    <div className="ans">
                        <span className="ansMsg">답</span> : 미니얼라
                    </div>
                </div>
                <Chat />
                <Input />
            </div>
        );
    }
}

export default Song;