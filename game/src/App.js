import React, {useState} from "react";
import Song from "./component/SongInfo";
import Log from "./component/log";
import Score from "./component/score";
import Btns from "./component/btns";
import "./sass/game.scss"
import "./sass/quiz.scss"

const App = ()=>{
    const [logTrigger, setTrigger] = useState(false);
    const [start, setStart] = useState(null);

    let users = [
        {
            nickname : "ㅇㅇ",
            score : 43,
            color : "red",
            roomMaster : true
        },
        {
            nickname : "bini",
            score : 73,
            color : "blue",
            roomMaster : false
        }
    ]
    let songs = [
        {
            title : "We go - 프로미스나인",
            hint : [
                {
                    category : "가수힌트",
                    context : "프로미스나인",
                    time : 55
                },
                {
                    category : "초성힌트",
                    context : "ㅇ ㄱㅇ",
                    time : 50
                }
            ],
            ans : ["we go", "위 고", "위 고우"],
            url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
            duration : 60
        },
        {
            title : "Feel good - 프로미스나인",
            hint : [
                {
                    category : "가수힌트",
                    context : "프로미스나인",
                    time : 40
                },
                {
                    category : "초성힌트",
                    context : "ㅍ ㄱ",
                    time : 20
                }
            ],
            ans : ["feel good", "필 굿"],
            url : "https://docs.google.com/uc?export=open&id=1ioGdk3y1sEy5MipF8I2r1t3vph7Ru0lY",
            duration : 60
        }
    ]
    let chat = [
        {
            username : "holy",
            color : "red",
            context : "아 죽고싶다."
        }
    ]

    return(
        <div className="main">
            <Score users={users}/>
            <Song songs={songs} setFunc={(func)=>{setStart(func)}}/>
            <Btns 
                openLog={()=>{setTrigger(true)}}
                startGame={()=>{start()}}
                exitGame={(name)=>{users.splice(users.findIndex(i=>i.nickname===name), 1);console.log(users)}}
                addUser={(user)=>{users.push(user)}}
            />
            {logTrigger ? <Log logs={chat} closeBox={()=>{setTrigger(false)}}/> : ""}
        </div>
    );
}

// class App extends Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             logOn : false,
//             start : ''
//         }
//         //under two object must be served by server
//         this.users = [
//             {
//                 nickname : "ㅇㅇ",
//                 score : 43,
//                 color : "red",
//                 roomMaster : true
//             },
//             {
//                 nickname : "bini",
//                 score : 73,
//                 color : "blue",
//                 roomMaster : false
//             }
//         ]
//         this.songs = [
//             {
//                 title : "We go - 프로미스나인",
//                 hint : [
//                     {
//                         category : "가수힌트",
//                         context : "프로미스나인",
//                         time : 55
//                     },
//                     {
//                         category : "초성힌트",
//                         context : "ㅇ ㄱㅇ",
//                         time : 50
//                     }
//                 ],
//                 ans : ["we go", "위 고", "위 고우"],
//                 url : "https://docs.google.com/uc?export=open&id=1Kb3-8vxRbpm5Lw8N86tbchJPOevg5iap",
//                 duration : 60
//             },
//             {
//                 title : "Feel good - 프로미스나인",
//                 hint : [
//                     {
//                         category : "가수힌트",
//                         context : "프로미스나인",
//                         time : 40
//                     },
//                     {
//                         category : "초성힌트",
//                         context : "ㅍ ㄱ",
//                         time : 20
//                     }
//                 ],
//                 ans : ["feel good", "필 굿"],
//                 url : "https://docs.google.com/uc?export=open&id=1ioGdk3y1sEy5MipF8I2r1t3vph7Ru0lY",
//                 duration : 60
//             }
//         ]
//         this.chat = [
//             {
//                 username : "holy",
//                 color : "red",
//                 context : "아 죽고싶다."
//             }
//         ]
//     }
//     render(){
//         return(
//             <div className="main">
//                 <Score users={this.users}/>
//                 <Song songs={this.songs} setFunc={(func)=>{this.setState({start : func})}}/>
//                 <Btns 
//                     openLog={()=>{this.setState({logOn : true})}}
//                     startGame={()=>{this.state.start()}}
//                     exitGame={(name)=>{this.users.splice(this.users.findIndex(i=>i.nickname===name), 1);console.log(this.users)}}
//                     addUser={(user)=>{this.users.push(user)}}
//                 />
//                 {this.state.logOn ? <Log logs={this.chat} closeBox={()=>{this.setState({logOn : false})}}/> : ""}
//             </div>
//         );
//     }
// }

export default App;