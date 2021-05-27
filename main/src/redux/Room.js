let initialState = {
    rooms : [],
    check : 0
}

const check = "room/Check"
const changeRoom = "room/change"
const changeRooms = "room/changes"

const Check = () =>{
    return {
        action : check
    }
}
const ChangeRoom = (room)=>{
    return {
        action : changeRoom,
        payload : room 
    }
}

const ChangeRooms = (rooms)=>{
    return {
        action : changeRooms,
        payload : rooms
    }
}

const roomReducer = (state = initialState, action)=>{
    switch (action.type){
        case check: 
            let a = state;
            a.check+=1;
            return a;
        case changeRoom:
            let b = state;
            let idx = b.rooms.findIndex(i => i.title === action.payload.room.title);
            b.rooms[idx] = action.payload.room;
            return a;
        case changeRooms:
            return action.payload.rooms
        default:
            return state   
    }
    
}

export {Check, ChangeRoom, ChangeRooms};

export default roomReducer;
