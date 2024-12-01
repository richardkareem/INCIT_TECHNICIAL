import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryType, ExpenseType, userData } from '../../types/global.type';
import { ColorType, IconType } from '../../db/db.type';

type InitialProps = {
    user: userData,
    expenseByCategory: any[],
    expenseByCategoryDummy: any[]
    isFiltering: boolean
    allDataUsers: userData[],
    category: CategoryType[],
    expense: ExpenseType[],
    color: ColorType[]
    icon: IconType[]
    // filteredExpense: ExpenseType[]
}

const initialState : InitialProps = {
    user:{
        id_user:0,
        email:'',
        full_name:'',
        role:'',
        token:'',
        password:'',
    },
    expenseByCategory:[],
    expenseByCategoryDummy: [],
    isFiltering:false,
    allDataUsers: [],
    category: [],
    expense:[],
    color:[],
    icon: []
    // filteredExpense:[]
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers:{
        setDataUser: (state, actions: PayloadAction<userData>) =>{
            state.user = actions.payload;
        },
        setExpenseByCategory: (state, actions) =>{
            state.expenseByCategory = actions.payload;
        },
        setExpenseUser: (state, actions: PayloadAction<ExpenseType[]>) =>{
            state.expense = actions.payload;
        },
        setExpenseByCategoryDummy : (state, action) =>{
            state.expenseByCategoryDummy = action.payload;
        },
        toggleisFiltering:(state, actions)=>{
            state.isFiltering = actions.payload;
        },
        setAllDataUsers: (state, actions:PayloadAction<userData[]>) =>{
            state.allDataUsers = actions.payload;
        },
        setCategoryData: (state, action:PayloadAction<CategoryType[]>) =>{
            state.category = action.payload;
        },
        setColorData: (state, action:PayloadAction<ColorType[]>) =>{
            state.color = action.payload
        },
        setIconData: (state, action:PayloadAction<IconType[]>) =>{
            state.icon = action.payload
        },
    },
});

export const {setIconData, setColorData,setDataUser, setExpenseByCategory, toggleisFiltering, setExpenseByCategoryDummy, setAllDataUsers, setCategoryData, setExpenseUser} = globalSlice.actions;
export default globalSlice.reducer;
