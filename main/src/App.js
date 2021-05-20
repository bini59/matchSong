import React, { Component } from 'react';
import Select from "./component/select";
import './scss/app.scss';

class App extends Component {
	render() {
		return (
      <div className="main">
        <div id="mainTitle"><span>노래 맞추기</span></div>
        <button className="mainBtn" id="btn1">방 만들기</button>
        <button className="mainBtn" id="btn2">접속하기</button>
        <Select />
      </div>
		);
	}
}

export default App;
