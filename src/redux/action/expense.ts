import { AppThunk, RootState } from "../../types/redux.type";
import { getAllDataExpenseUsers, getAllExpenseByEmail, updateExpense } from "../../services/expene.service";
import { showMessage } from "../../utils/showMessage";
import { ExpenseType, SetExpenseType, userData } from "../../types/global.type";
import { setAllDataUsers, setDataUser, setExpenseByCategory, setExpenseByCategoryDummy } from "../reducer/global";
import { getData } from "../../utils/storeage";
import { editUser } from "../../services/authModels.service";

const stateGlobal =  (state : RootState) => state.global

function getRandomGray() {
    const value = Math.floor(Math.random() * 256); // Nilai antara 0-255
    return `rgb(${value}, ${value}, ${value})`; // Format RGB
}

const filterData = (expenses: ExpenseType[]) =>{
    let obj :any = {}
    expenses.forEach((item) =>{
        const category = item.category
        const amount = Number(item.amount)
        if(!obj[category]){
            obj[category] = {...item, amount:amount}
        }else{
            obj[category] = {
                ...item,
                amount: obj[category]['amount'] + amount
            }
        }
    })
    
    return Object.keys(obj)?.map((item) =>{
        if(obj[item]){
            return{
                name: obj[item]['category'],
                population: obj[item]['amount'],
                color: getRandomGray(),
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            }
        }
    })

}

export const filterExpense = (
    from:Date | string, 
    to: Date | string, 
    category: string, 
    // onSuccess: ()=> void,
    setLoading: (loading:boolean)=> void
) : AppThunk => async(dispatch, getState) =>{
    setLoading(true)
    try {
        const {user} = stateGlobal(getState());
        const data  = await getAllExpenseByEmail(user?.email)
        if(data){  
            let expenses : ExpenseType[] = []
            let total = 0;
            expenses = data?.expenses ?  data?.expenses?.filter((item : ExpenseType) => {
                return item.create_at >= from && item.create_at <= to
            }) : []
             if(expenses && expenses.length > 0){
                if(category){
                    expenses = expenses.filter(item => item.category === category)
            
                  }
                  if(expenses?.length > 0 ){
                     total = expenses.map(item => Number(item.amount))?.reduce((acc , prev )=> acc + prev)
                  }
                 const newData : userData = {
                    ...user,
                    expenses: expenses,
                    totalExpenses: total.toString()
                }
                dispatch(setDataUser(newData))
                dispatch(setExpenseByCategoryDummy(filterData(newData?.expenses)))
                // onSuccess()
                // dispatch(setExpenseByCategory(filterData(newData?.expenses)))   
             }else{
                const newData : userData = {
                    ...user,
                    expenses: expenses,
                    totalExpenses: total.toString()
                }
                dispatch(setDataUser(newData))
                dispatch(setExpenseByCategoryDummy(filterData(newData?.expenses)))
             }
            
        }
       
    } catch (error : Error | unknown) {
        if(error instanceof Error){
         showMessage(error.message, 'danger')   
        }
    }finally{
        setLoading(false)
    }
     
   
}

export const getAllExpense = (setLoading:(loading:boolean)=> void) : AppThunk => async(dispatch, getState) => {
    setLoading(true)
    try{
            const {user} = stateGlobal(getState());
            const data  = await getAllExpenseByEmail(user?.email)
            if(data){  
                const total : number = data?.expenses?.map((item : ExpenseType)=> Number(item.amount)).reduce((prev: number, acc: number) => prev + acc)
                const newData : userData = {
                    ...user,
                    expenses: data?.expenses || [],
                    totalExpenses: total?.toString() || "0"
                }
                dispatch(setDataUser(newData))
                dispatch(setExpenseByCategoryDummy(filterData(newData?.expenses)))
                dispatch(setExpenseByCategory(filterData(newData?.expenses)))
            }
        
            
    }catch(error : Error | unknown){
        if(error instanceof Error){
            showMessage(error.message, "danger")
        }
    }finally{
        setLoading(false)
    }
}

export const createExpense = (setLoading:(loading:boolean)=> void, data: SetExpenseType, onSuccess:()=> void) : AppThunk => async(dispatch, getState) => {
    setLoading(true)
    try{
        const {user} = stateGlobal(getState());
        
        let currentExpenses = []
        if(user?.expenses){
            currentExpenses = [
                ...user.expenses,
                {
                    expense: data.note,
                    amount:data?.expense,
                    create_at:data?.day,
                    category:data?.category
                }
            ]
        }else{
            currentExpenses = [
                {
                    expense: data.note,
                    amount:data?.expense,
                    create_at:data?.day,
                    category:data?.category
                }
            ]
        }
        
        await updateExpense(user?.email, currentExpenses)
        dispatch(getAllExpense(setLoading))
        showMessage("Success added expense", "success")
        onSuccess()
    }catch(error : Error | unknown){
        if(error instanceof Error){
            showMessage(error.message, "danger")
        }
    }finally{
        setLoading(false)
    }
}

export const getAllDataUsers = () :AppThunk => async(dispatch) =>{
    try {
        let profile = await getData('profile')
        profile = JSON.parse(profile);
        const data = await getAllDataExpenseUsers()
        const user = await getAllExpenseByEmail(profile?.email)
        if(user){
            dispatch(setDataUser(user as any))
        }
        dispatch(setAllDataUsers(data))
    } catch (error: Error | unknown) {
        if(error instanceof Error){
            showMessage(error.message, "danger")
        }
    }
}

export const deleteExpensesByEmail = (email: string, data: any, onSuccess: ()=> void):AppThunk => async(dispatch, getState) =>{
    try {
        await editUser(email, data)
        dispatch(getAllDataUsers())
        onSuccess()
    } catch (error : Error | unknown) {
        if(error instanceof Error){
            showMessage(error.message, 'danger')
        }
    }
}
