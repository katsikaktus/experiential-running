import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import mapRunReducer from "./slices/runSlice"


export const store = configureStore({
    reducer: {
        nav: navReducer,
        runMap: mapRunReducer,
    },
    
});