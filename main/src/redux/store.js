import {configureStore} from "@reduxjs/toolkit"
import logger from "redux-logger"
import roomReducer from "./roomSlice"

export default configureStore({
    reducer : {
        rooms : roomReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})