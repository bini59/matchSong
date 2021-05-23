import React, {Component} from "react";
import ReactAudioPlayer from "react-audio-player"
import Input from "./input"
import Chat from "./chat"


class Song extends Component{
    constructor(props){
        super(props);

        this.state = {
            songNum : 0,
            answer : false,
            hintnum : 0,
            hint : [],
            sec : this.props.songs[0].duration,
        }
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countdown = this.countdown.bind(this);
        this.hint = []
    }
    startTimer(){
        if (this.timer === 0 && this.state.sec > 0) {
        this.timer = setInterval(this.countdown, 1000);
        }
    }
    countdown(){
        if(this.props.songs[this.state.songNum].hint[this.state.hintnum].time === this.state.sec){
            this.hint.push(<span className="hintMsg">{this.props.songs[this.state.songNum].hint[this.state.hintnum].category} : </span>)
            this.hint.push(<span>{this.props.songs[this.state.songNum].hint[this.state.hintnum].context}</span>)
            this.hint.push(<br/>)
            if(this.props.songs[this.state.songNum].hint.length-1 > this.state.hintnum)
                this.setState({hintnum : this.state.hintnum+1})
        }
        if(this.state.sec > 0) this.setState({sec : this.state.sec-1})
        else{
            clearInterval(this.timer)
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
                        <span className="remainSec">- {this.state.sec}초 -</span>
                    </div>
                    <div className="hint">
                        {this.hint}
                    </div>
                    <div className="ans">
                        <span className="ansMsg">답</span> : 미니얼라
                    </div>
                </div>
                <Chat />
                <Input />
                <ReactAudioPlayer 
                    src="../asset/song/wego.mp3"
                    id="audio"
                    autoPlay
                    controls
                />
                <button onClick={this.startTimer}>dd</button>
            </div>
        );
    }
}

export default Song;