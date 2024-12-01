 import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { AppDispatch, AppThunk } from '../types/redux.type';
import db from './db';
import { setExpenseUser } from '../redux/reducer/global';
import { ExpenseType } from '../types/global.type';


const getExpenseByIdUser = async(database: SQLiteDatabase,id: number) =>{
    const q = `	
    SELECT expense.id, expense.id_category, full_name, expense_name AS expense, category_name as category, cost as amount, expense.color, create_at
	FROM expense 
	INNER JOIN user ON expense.id_user = user.id_user 
	INNER JOIN category on expense.id_category = category.id
	WHERE user.id_user = ?`;
    const value = [id];

    try {
        const expenses : any[] = [];
        const expense = await database.executeSql(q, value);

        expense.forEach(result =>{
            console.log('panjang length:', result.rows.length);
            for(let i = 0; i < result.rows.length; i++){

                expenses.push(result.rows.item(i));
            }
        });
        return expenses;
    } catch (error) {
         console.error('Cannot get expense table from db');
         throw error;
    }
};

const getAllExpense = async(database: SQLiteDatabase) =>{
    const q = 'SELECT * from expense;';
    try{
        const expenses : any[] = [];
        const expense = await database.executeSql(q);
        expense.forEach(result =>{
            for(let i = 0; i < result.rows.length; i++){
                expenses.push(result.rows.item(i));
            }
        });
        console.log(expenses);
    }catch(e){
        console.log(e);

    }
};

const getExpenseUser = (id_user: number) => async(dispatch:AppDispatch) =>{
    try{
        const database = await db.connectToDb();
        const expenses = await getExpenseByIdUser(database, id_user);
        dispatch(setExpenseUser(expenses));
    }catch(e){
        console.error(e);
        throw e;
    }
};

const createExpense = (database: SQLiteDatabase, expense: ExpenseType, id_user: number, id_category: number) =>
        async(dispatch: AppDispatch) =>
    {
    const q = `
    INSERT INTO expense (id_user, id_category, expense_name, create_at, cost, color)
    VALUES (?,?,?,?,?,?);
    `;
    const value = [];
    value.push(id_user);
    value.push(id_category);
    value.push(expense.expense);
    value.push(expense.create_at);
    value.push(Number(expense.amount));
    value.push(expense.color);

    console.log('ini value: ', value);
    try {
        await database.executeSql(q, value);

        dispatch(getExpenseUser(id_user));
    } catch (error) {
        console.error('Failed to add expense to db', error);
        throw error;
    }
};

const dateToMm = (date: string) : string =>  {
    return new Date(date).getTime().toString();
};

const filterExpense = (id_user: number, from: string, to: string, id_category: number, ) : AppThunk => async(dispatch) =>{
    try{

        const database = await db.connectToDb();
        const expense = await getExpenseByIdUser(database, id_user);
        from = dateToMm(from);
        to = dateToMm(to);
        const filtered = expense.filter((item) => {
            const create_at = dateToMm(item.create_at);
            if(id_category > 0){
                return item.id_category === id_category && create_at >= from && create_at <= to;
            }else{
                return create_at >= from && create_at <= to;
            }
        });
        dispatch(setExpenseUser(filtered));
    }catch(e){
        throw e;
    }
};

export default {
    getExpenseUser,
    createExpense,
    getAllExpense,
    filterExpense,
};
