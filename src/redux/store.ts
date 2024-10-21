import { configureStore } from "@reduxjs/toolkit";
import global from "./reducer/global";

export const store = configureStore({
    reducer:{
        global: global
    }
})
