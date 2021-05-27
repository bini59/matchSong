import {} from "redux"

const addTodo = text => {
    return {
        type: 'todos/todoAdded',
        payload: text
    }
}

const countReducer = (state = {value : 0}, action){
    if(action === "counter/increment"){
        return state.value+1;
    }
}