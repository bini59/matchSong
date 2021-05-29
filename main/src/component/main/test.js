

const main = ()=>{


    return (
        <div className="main" >
        <div id="mainTitle"><span>노래 맞추기</span></div>
        <div className="roomlist">
              <ul>
                {rooms(roomTitles)}
                <li className="roomli" onClick={()=>{setSelect(true)}}><div className="addroom">+</div></li>
              </ul>
        </div><br/>
        {onSelect ? <Select 
          closeWindow={()=>{setSelect(false)}}
          renewRooms={(roomlist)=>{rooms(roomlist)}}
        /> : ''}
      </div>
    )
}