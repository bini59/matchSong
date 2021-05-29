import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux"
import ReactAudioPlayer from "react-audio-player"

import Chat from "./chat"

import {
    changeRooms,
    selectRoom
} from "../../redux/roomSlice"


const Timer = (props)=>{
    const [sec, setSec] = useState(props.duration);

    useEffect(()=>{
        if(props.onTimer){
            const countdown = setInterval(()=>{
                if(sec > 0) setSec(sec-1)
                else clearInterval(countdown)
            }, 1000)
    
            return ()=>{clearInterval(countdown)}
        }
    })

    return sec;
}

//show hint
const Hint = (props)=>{
    const [hintN, setHintN] = useState(0);
    const [hint, setHint] = useState([])

    useEffect(()=>{
        if(props.sec === props.hints[hintN].time){
            setHint(()=>{
                hint.push(
                    <div key={props.hints[hintN].time}>
                        <span className="hintMsg">{props.hints[hintN].category} : </span>
                        <span>{props.hints[hintN].context}</span>
                    </div>
                )
                return hint
            })
            if(hintN < props.hints.length-1){
                setHintN(hintN+1);
            }
        }
    }, [props.sec, hint, hintN, props.hints])

    return hint;
}


const Song = (props)=>{

    // room
    const rooms = useSelector(selectRoom)
    const idx = props.idx

    //current Song number
    const [songNum, setSongnum] = useState(0);
    //Answer show trigger
    const [ansState, setAnstrigger] = useState(false);
    //Answer
    const [ans, setAns] = useState(<div className="ans"><span className="ansMsg">답</span> : {rooms[idx].Song[songNum].title}</div>)
    //ontimer
    const [onTimer, setTimer] = useState(false);

    let temp = Timer({duration : props.songs[songNum].duration, onTimer:onTimer});
    let song = document.getElementById("audio");


    //일단 기달려 이거 굉장히 잘못되었어....
    useEffect(()=>{
        if(temp === 0){
            if(!ansState) setAnstrigger(true);
            {song ? song.pause() : song = document.getElementById("audio")}
            if(songNum < props.songs.length-1){
                setSongnum(songNum+1);
                song.src = props.songs[songNum].url;
                setAnstrigger(false);
                setAns(<div className="ans"><span className="ansMsg">답</span> : {props.songs[songNum].title}</div>)
            }
        }
    }, [temp, ansState, props.songs, song, songNum]);
    
    return(
        <div className="quiz">
            <div className="temp">
                <div className="title">
                    <span className="remainSong">남은곡 ( 100 / 100 )</span><br/>
                    <span className="description"><span className="_1">음악</span>을 듣고 <span className="_2">답</span>을 입력하세요</span><br/>
                    <span className="remainSec">- {temp}초 -</span><br/>
                    <ReactAudioPlayer 
                        src={props.songs[0].url ? props.songs[0].url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap"}
                        id="audio"
                        type="mpeg"
                        onLoadedMetadata={()=>{song = document.getElementById("audio")}}
                    />
                </div>
                <div className="hint">
                    <Hint 
                        sec={temp}
                        hints={props.songs[songNum].hint}
                    />
                </div>
                {ansState ? ans : <div className="ans"></div>}
            </div>
            <Chat room={props.room} socket={props.socket} idx={idx}/>
            <button onClick={()=>{
                setTimer(true);
                song.play();
            }}>뭐지 이거 맞나?</button>
        </div>
    );
}



// class Song extends Component{
//     constructor(props){
//         super(props);

//         this.chat = new Queue();

//         this.state = {
//             songNum : 0,
//             ansState : false,
//             ans : <div className="ans"><span className="ansMsg">답</span> : {this.props.songs[0].title}</div>,
//             chat : this.chat.getChat(),
//             hintnum : 0,
//             sec : 10,
//         }
//         this.timer = 0;
//         this.hint = []
//         this.startTimer = this.startTimer.bind(this);
//         this.countdown = this.countdown.bind(this);
//         this.addChat = this.addChat.bind(this);

//         this.song = document.getElementById("audio");

//         this.props.setFunc(this.startTimer);
//     }

//     addChat(){
//         let c = {
//             color : "red",
//             nickname : "bini",
//             chat : "TEST CHAT"
//         }
//         let style = {color : c.color}
//         this.chat.addChat(<span className="chatMsg"><span style={style}>{c.nickname}</span> : {c.chat}<br/></span>)
//         this.setState({
//             chat : this.chat.getChat()
//         })
//     }

    
//     startTimer(){
//         this.song.play()
//         if (this.timer === 0 && this.state.sec > 0) {
//         this.timer = setInterval(this.countdown, 1000);
//         }
//     }
//     countdown(){
//         if(this.props.songs[this.state.songNum].hint[this.state.hintnum].time === this.state.sec){
//             /*
//                 힌트를 hint에 넣고...
//                 그 힌트를 setState로 갱신하기.
//             */
//             this.hint.push(<span className="hintMsg">{this.props.songs[this.state.songNum].hint[this.state.hintnum].category} : </span>)
//             this.hint.push(<span>{this.props.songs[this.state.songNum].hint[this.state.hintnum].context}</span>)
//             this.hint.push(<br/>)
//             if(this.props.songs[this.state.songNum].hint.length-1 > this.state.hintnum)
//                 this.setState({hintnum : this.state.hintnum+1})
//         }
//         if(this.state.sec > 0) this.setState({sec : this.state.sec-1})
//         else{
//             clearInterval(this.timer)
//             if(!this.state.ansState){
//                 this.setState({ansState : true});
//             }

//             if(this.state.songNum < this.props.songs.length-1){
//                 this.setState({
//                     songNum : this.state.songNum+1,
//                     hintnum : 0,
//                     ansState : false,
//                     ans : <div className="ans"><span className="ansMsg">답</span> : {this.props.songs[this.state.songNum+1].title}</div>,
//                     sec : this.props.songs[this.state.songNum+1].duration
//                 })

//                 /*
//                     노래를 멈추고
//                     hint도 초기화 해주고
//                     url을 다시 설정해서 다음노래 불러오고
//                     timer를 초기설정으로 바꾸고

//                     (timer를 꼭 서버에서 실행하는걸로 바꿔주기)
//                     timer를 실행하면

//                     노래실행과 countdown이 같이 실행됨.
//                 */
//                 this.song.pause()
//                 this.hint = []
//                 this.song.src = this.props.songs[this.state.songNum].url;
//                 this.timer = 0;
//                 this.startTimer();
//             }
//         }
//     }
//     //this.props.songs[this.state.songNum].url
//     render(){
//         return(
//             <div className="quiz">
//                 <div className="temp">
//                     <div className="title">
//                         <span className="remainSong">남은곡 ( 100 / 100 )</span><br/>
//                         <span className="description"><span className="_1">음악</span>을 듣고 <span className="_2">답</span>을 입력하세요</span><br/>
//                         <span className="remainSec">- {this.state.sec}초 -</span><br/>
//                         <ReactAudioPlayer 
//                             src={this.props.songs[0].url}
//                             id="audio"
//                             type="mpeg"
//                             onLoadedMetadata={()=>{this.song = document.getElementById("audio")}}
//                         />
//                     </div>
//                     <div className="hint">
//                         {this.hint}
//                     </div>
//                     {this.state.ansState ? this.state.ans : <div className="ans"></div>}
//                 </div>
//                 <div className="chat">
//                     {this.state.chat}
//                 </div>
//                 <button onClick={this.addChat}>tt</button>
//                 <Input />

//                 <button onClick={this.startTimer}>dd</button>
//             </div>
//         );
//     }
// }

export default Song;