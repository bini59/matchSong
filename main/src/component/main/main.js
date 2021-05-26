import React, { useState } from 'react';
import Select from "./select";
import {Link} from "react-router-dom";

import "../../scss/app.scss";
import "../../scss/select.scss"

const Main = ()=>{
    //State that turn on Make room(Select)
    const [onSelect, setSelect] = useState(false);
    //Selected room
    const [clicked, setClick] = useState("");
  
    //roomlist(must served by server)
    const [roomTitles, setRoom] = useState([
      {
        title : "2015년까지 아이돌노래",
        users : ["", "nickname"],
        Song : [100, 100],
        genre : ["2005~2010 아이돌", "2010~2015 아이돌"]
      },
      {
        title : "집가고 싶다",
        users : ["", "nickname", "asdf"],
        Song : [100, 100],
        genre : ["롤스킬 이펙트", "2010~2015 아이돌"]
      }
    ]);
    const rooms = ()=> {return roomTitles.map((room)=>{
      return (
        <li key={room.title} className="roomli">
            {/* Link => check btn */}
            <Link to="/game">
            {/* room.title => room.num */}
            <div className="room" onClick={()=>{setClick(room.title)}}>
              <div className="title">{room.title}</div>
              <div className="genre">[{room.genre.map((genre)=>{return(<span>{genre}, </span>)})}]</div><br></br>
              <div className="users">{room.users.map((user)=>{return('ጿ')})}</div>
              <div className="remainsong">{room.Song[0]}/{room.Song[1]}</div>
            </div>
            </Link>
        </li>
      );
    });}
  
  
    return (
      <div className="main">
        <div id="mainTitle"><span>노래 맞추기</span></div>
        <div className="roomlist">
              <ul>
                {rooms()}
                <li className="roomli" onClick={()=>{setSelect(true)}}><div className="addroom">+</div></li>
              </ul>
        </div><br/>
        {onSelect ? <Select 
          closeWindow={()=>{setSelect(false)}}
          addRoom={(room)=>{setRoom(()=>{return roomTitles.concat([room])})}}
        /> : ''}
      </div>
    );
  }
  
  // class App extends Component {
  //   constructor(props){
  //     super(props);
  //     this.state = {
  //       onSelct : false,
  //       clicked : ""
  //     }
  
  //     let roomTitles = [
  //       {
  //         title : "2015년까지 아이돌노래",
  //         users : ["", "nickname"],
  //         Song : [100, 100],
  //         genre : ["2005~2010 아이돌", "2010~2015 아이돌"]
  //       },
  //       {
  //         title : "집가고 싶다",
  //         users : ["", "nickname", "asdf"],
  //         Song : [100, 100],
  //         genre : ["롤스킬 이펙트", "2010~2015 아이돌"]
  //       }
  //     ]
  
  //     this.rooms = roomTitles.map((room)=>{
  //         return (
  //           <li key={room.title} className="roomli">
  //               <div className="room" onClick={()=>{this.setState({clicked : room.title})}}>
  //                 <div className="title">{room.title}</div>
  //                 <div className="genre">[{room.genre.map((genre)=>{return(<span>{genre}, </span>)})}]</div><br></br>
  //                 <div className="users">{room.users.map((user)=>{return('ጿ')})}</div>
  //                 <div className="remainsong">{room.Song[0]}/{room.Song[1]}</div>
  //               </div>
  //           </li>
  //         );
  //     })
  
  //     this.select = this.select.bind(this)
  //   }
  
  //   // function area
  //   componentDidMount() {
  //     fetch('https://3001-blush-wolverine-2p0rzvu8.ws-us07.gitpod.io/')
  //       .then(res=>res.json())
  //       .then(data=>this.setState({username:data.username}));
  //   }
  //   select(){
  //     this.setState({onSelct : true});
  //   }
  
  
  // 	render() {
  // 		return (
  //         <div className="main">
  //           <div id="mainTitle"><span>노래 맞추기</span></div>
  //           <div className="roomlist">
  //                 <ul>
  //                   {this.rooms}
  //                   <li className="roomli" onClick={this.select}><div className="addroom">+</div></li>
  //                 </ul>
  //           </div><br/>
  //           {this.state.onSelct ? <Select closeWindow={()=>{this.setState({onSelct : false})}}/> : ''}
  //         </div>
  // 		);
  // 	}
  // }

export default Main;