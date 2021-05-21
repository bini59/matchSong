import React, { Component } from 'react';
import Select from "./component/select";
import "./scss/app.scss";
import "./scss/select.scss"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      onSelct : false
    }
    this.select = this.select.bind(this)
  }

  select(){
    this.setState({onSelct : true});
  }


	render() {

		return (
      <div>
        <div className="main">
          <div id="mainTitle"><span>노래 맞추기</span></div>
          <button className="mainBtn" id="btn1" onClick={this.select}>방 만들기</button>
          <button className="mainBtn">접속하기</button>
        </div>
        {this.state.onSelct ? <Select closeWindow={()=>{this.setState({onSelct : false})}}/> : ''}
      </div>
		);
	}
}

export default App;
