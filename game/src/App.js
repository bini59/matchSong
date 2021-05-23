import React, {Component} from "react";
import Song from "./component/SongInfo";
import Score from "./component/score";
import "./sass/game.scss"
import "./sass/quiz.scss"

class App extends Component{
    constructor(props){
        super(props)

        //under two object must be served by server
        this.users = [
            {
                nickname : "ㅇㅇ",
                score : 43,
                color : "red"
            },
            {
                nickname : "bini",
                score : 73,
                color : "blue"
            }
        ]
        this.songs = [
            {
                title : "wego",
                hint : [
                    {
                        category : "가수힌트",
                        context : "프로미스나인",
                        time : 40
                    },
                    {
                        category : "초성힌트",
                        context : "ㅇ ㄱㅇ",
                        time : 20
                    }
                ],
                ans : ["we go", "위 고", "위 고우"],
                url : "../asset/song/wego.mp3",
                duration : 60
            },
            {
                title : "feelgood",
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
                url : "../asset/song/feelgood.mp3",
                duration : 60
            }
        ]
    }
    render(){
        return(
            <div className="main">
                <Score users={this.users}/>
                <Song songs={this.songs}/>
            </div>
        );
    }
}

export default App;