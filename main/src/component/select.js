import React, {Component} from "react";
import Selbtn from "./btn";

class Select extends Component{
    constructor(props){
        super(props);
        const btns = [
            "K-POP(2000-2005)",
            "K-POP(2005-2010)",
            "K-POP(2010-2015)",
            "K-POP(2015-2021)",
            "2세대 여자아이돌",
            "3세대 여자아이돌",
            "4세대 여자아이돌",
            "롤 스킬 이펙트"
        ]
        this.genreBtns = btns.map((genre, idx)=>{
            return <Selbtn key={idx} name={genre} onselected={()=>{
                let index = this.selected.genre.indexOf(genre)
                if(index >-1){this.selected.genre.splice(index,1)}
                else{this.selected.genre.push(genre)}
                //console.log(this.selected)
            }}/>
        });

        this.selected = {
            genre : []
        }
    }
    

    render(){
        return (
            <div className="selectMode">
                <div className="selSection">
                    <span>장르</span><br/>
                    {this.genreBtns}
                </div>
                <div className="selSection">
                    <span>방 번호</span><br/>
                    <input className="roomNo" type="text" />
                </div>
                <button className="deciBtn" id="accept">확인</button>
                <button className="deciBtn" onClick={()=>{this.props.closeWindow()}}>취소</button>
            </div>
        );   
    }   
}

export default Select;