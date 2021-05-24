import React, {Component} from "react";

class Btns extends Component{

    constructor(props){
        super(props)

        this.adduser = this.adduser.bind(this);

        this.state = {
            user : {
                nickname : "bini",
                color : "blue",
                score : 73,
                roomMaster : true
            },
            name : true
        }
        this.name = (
            <div className="addUsr">
                <span className="nameInfo">닉네임 입력</span><br/>
                <input type="text" id="newNickname"/><br/>
                <button className="nameOk" onClick={this.adduser}>확인</button>
            </div>
        )
    }

    adduser(){
        let name = document.getElementById("newNickname").value;
        /*
            submit name to server and receive User data and
            this.setState({
                user : {receive user data}
            })
        */
       this.setState({user : {
           nickname : name,
           color : "blue",
           roomMaster : false,
           score : 0
       }})
       this.props.addUser(this.state.user)
       this.setState({name : false})
    }

    render(){
        return (
            <div className="btns">
                {this.state.name ?this.name : ''}
                {this.state.user.roomMaster?<button className="gameStart" onClick={this.props.startGame}>게임 시작</button>: ""}
                <button className="gameExit" onClick={()=>{
                    this.props.exitGame(this.state.user.nickname);
                    //go to home code
                }}>나가기</button>
                <button className="chatLog" onClick={this.props.openLog}>로그</button>
            </div>
        );
    }
}

export default Btns;