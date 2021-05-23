import React, {Component} from "react";
import ReactAudioPlayer from "react-audio-player"
import Input from "./input"

class Queue{
    constructor(){
        this._arr = [
            <span><br/></span>,
            <span><br/></span>,
            <span><br/></span>,
            <span><br/></span>,
            <span><br/></span>
        ];
    }
    enqueue(item){
        this._arr.push(item);
    }
    dequeue(){
        this._arr.shift();
    }
    addChat(item){
        this.enqueue(item);
        console.log(this._arr)
        this.dequeue();
        
    }
    getChat(){
        return this._arr;
    }
    
}



class Song extends Component{
    constructor(props){
        super(props);

        this.chat = new Queue();

        this.state = {
            songNum : 0,
            ansState : false,
            ans : <div className="ans"><span className="ansMsg">답</span> : {this.props.songs[0].title}</div>,
            chat : this.chat.getChat(),
            hintnum : 0,
            sec : 10,
        }
        this.timer = 0;
        this.hint = []
        this.startTimer = this.startTimer.bind(this);
        this.countdown = this.countdown.bind(this);
        this.addChat = this.addChat.bind(this);

        this.song = document.getElementById("audio");
    }

    addChat(){
        let c = {
            color : "red",
            nickname : "bini",
            chat : "TEST CHAT"
        }
        let style = {color : c.color}
        this.chat.addChat(<span className="chatMsg"><span style={style}>{c.nickname}</span> : {c.chat}<br/></span>)
        this.setState({
            chat : this.chat.getChat()
        })
    }

    
    startTimer(){
        this.song.play()
        if (this.timer === 0 && this.state.sec > 0) {
        this.timer = setInterval(this.countdown, 1000);
        }
    }
    countdown(){
        if(this.props.songs[this.state.songNum].hint[this.state.hintnum].time === this.state.sec){
            /*
                힌트를 hint에 넣고...
                그 힌트를 setState로 갱신하기.
            */
            this.hint.push(<span className="hintMsg">{this.props.songs[this.state.songNum].hint[this.state.hintnum].category} : </span>)
            this.hint.push(<span>{this.props.songs[this.state.songNum].hint[this.state.hintnum].context}</span>)
            this.hint.push(<br/>)
            if(this.props.songs[this.state.songNum].hint.length-1 > this.state.hintnum)
                this.setState({hintnum : this.state.hintnum+1})
        }
        if(this.state.sec > 0) this.setState({sec : this.state.sec-1})
        else{
            clearInterval(this.timer)
            if(!this.state.ansState){
                this.setState({ansState : true});
            }

            if(this.state.songNum < this.props.songs.length-1){
                this.setState({
                    songNum : this.state.songNum+1,
                    hintnum : 0,
                    ansState : false,
                    ans : <div className="ans"><span className="ansMsg">답</span> : {this.props.songs[this.state.songNum+1].title}</div>,
                    sec : this.props.songs[this.state.songNum+1].duration
                })

                /*
                    노래를 멈추고
                    hint도 초기화 해주고
                    url을 다시 설정해서 다음노래 불러오고
                    timer를 초기설정으로 바꾸고

                    (timer를 꼭 서버에서 실행하는걸로 바꿔주기)
                    timer를 실행하면

                    노래실행과 countdown이 같이 실행됨.
                */
                this.song.pause()
                this.hint = []
                this.song.src = this.props.songs[this.state.songNum].url;
                this.timer = 0;
                this.startTimer();
            }
        }
    }
    //this.props.songs[this.state.songNum].url
    render(){
        return(
            <div className="quiz">
                <div className="temp">
                    <div className="title">
                        <span className="remainSong">남은곡 ( 100 / 100 )</span><br/>
                        <span className="description"><span className="_1">음악</span>을 듣고 <span className="_2">답</span>을 입력하세요</span><br/>
                        <span className="remainSec">- {this.state.sec}초 -</span><br/>
                        <ReactAudioPlayer 
                            src={this.props.songs[0].url}
                            id="audio"
                            type="mpeg"
                            onLoadedMetadata={()=>{this.song = document.getElementById("audio")}}
                        />
                    </div>
                    <div className="hint">
                        {this.hint}
                    </div>
                    {this.state.ansState ? this.state.ans : <div className="ans"></div>}
                </div>
                <div className="chat">
                    {this.state.chat}
                </div>
                <button onClick={this.addChat}>tt</button>
                <Input />

                <button onClick={this.startTimer}>dd</button>
            </div>
        );
    }
}

export default Song;