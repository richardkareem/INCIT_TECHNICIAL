import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { IconType } from './db.type';
import { AppThunk } from '../types/redux.type';
import db from './db';
import { setIconData } from '../redux/reducer/global';

const _getAllIconTable = async(database: SQLiteDatabase) =>{
    const q = 'SELECT * FROM icon';
    try {
        const icon =  await database.executeSql(q);
        const icons : IconType[] = [];
        icon.forEach((result) =>{
            for(let i = 0; i < result.rows.length; i++){
                icons.push(result.rows.item(i));
            }
        });
        return icons;
    } catch (error) {
        console.error('error get icon table from db', error);
        throw error;
    }
};

const getAllIconTable = (): AppThunk => async(dispatch) =>{
    try {
        const database = await db.connectToDb();
        const icons = await _getAllIconTable(database);
        dispatch(setIconData(icons));
    } catch (error) {}
};


export default{
    getAllIconTable,
};
