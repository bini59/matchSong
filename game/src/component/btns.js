import React, {Component} from "react";

class Btns extends Component{

    render(){
        return (
            <div className="btns">
                <button className="gameStart">게임 시작</button>
                <button className="gameExit">나가기</button>
                <button className="chatLog" onClick={this.props.openLog}>로그</button>
            </div>
        );
    }
}

export default Btns;