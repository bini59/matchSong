import React, {useState} from "react";

const Selbtn = (props)=>{
    const [clicked, Click] = useState(false);

    return(
        <button 
            className={clicked? "selBtn clicked" : "selBtn"}
            onClick={()=>{
                Click(!clicked); 
                props.onselected();
            }}
        >{props.name}</button>
    );

}


// class Selbtn extends Component{
//     constructor(props){
//         super(props)

//         this.state = {
//             clicked : false
//         }
//         this.click = this.click.bind(this);
//     }
//     click(){
//         this.setState({
//             clicked : !this.state.clicked
//         })
//     }

//     render(){
//         return(
//             <button 
//                 className={this.state.clicked? "selBtn clicked" : "selBtn"}
//                 onClick={()=>{
//                     this.click(); 
//                     this.props.onselected();
//                 }}
//             >{this.props.name}</button>
//         )
//     }
// }

export default Selbtn;