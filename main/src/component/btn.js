import React, {Component} from "react";

class Selbtn extends Component{
    constructor(props){
        super(props)

        this.state = {
            clicked : false
        }
        this.click = this.click.bind(this);
    }
    click(){
        this.setState({
            clicked : !this.state.clicked
        })
    }

    render(){
        return(
            <button 
                className={this.state.clicked? "selBtn clicked" : "selBtn"}
                onClick={()=>{
                    this.click(); 
                    this.props.onselected();
                }}
            >{this.props.name}</button>
        )
    }
}

export default Selbtn;