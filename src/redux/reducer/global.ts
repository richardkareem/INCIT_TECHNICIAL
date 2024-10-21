import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userData } from "../../types/global.type";

type InitialProps = {
    user: userData,
    expenseByCategory: any[],
    expenseByCategoryDummy: any[]
    isFiltering: boolean
    allDataUsers: userData[]
}

const initialState : InitialProps = {
    user:{
        email:"",
        fullname:"",
        role:"",
        token:"",
        expenses:[],
        totalExpenses:""
    },
    expenseByCategory:[],
    expenseByCategoryDummy: [],
    isFiltering:false,
    allDataUsers: []
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers:{
        setDataUser: (state, actions: PayloadAction<userData>) =>{
            state.user = actions.payload
        },
        setExpenseByCategory: (state, actions) =>{
            state.expenseByCategory = actions.payload
        },
        setExpenseByCategoryDummy : (state, action) =>{
            state.expenseByCategoryDummy = action.payload
        },
        toggleisFiltering:(state, actions)=>{
            state.isFiltering = actions.payload
        },
        setAllDataUsers: (state, actions:PayloadAction<userData[]>) =>{
            state.allDataUsers = actions.payload
        }
    },
})

export const {setDataUser, setExpenseByCategory, toggleisFiltering, setExpenseByCategoryDummy, setAllDataUsers} = globalSlice.actions;
export default globalSlice.reducer