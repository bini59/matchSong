import React, {Component} from "react";
import Song from "./component/SongInfo"
import "./sass/game.scss"
import "./sass/quiz.scss"

class App extends Component{
    render(){
        return(
            <div className="main">
                <Song />
            </div>
        );
    }
}

export default App;