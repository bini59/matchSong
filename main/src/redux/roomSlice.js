import {createSlice} from "@reduxjs/toolkit"

export const roomSlice = createSlice({
    name : "room",
    initialState : {
        rooms : []
    },
    reducers : {
        changeRoom : (state, action)=>{

            let idx = state.rooms.findIndex(i => i.title === action.payload.title)
            state.rooms[idx] = action.payload.room
        },
        changeRooms : (state, action)=>{
            state.rooms = action.payload
        }
    }
})

export const {changeRoom, changeRooms} = roomSlice.actions;

export const selectRoom = state => state.rooms.rooms;

export default roomSlice.reducer