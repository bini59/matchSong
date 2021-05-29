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

export default Selbtn;