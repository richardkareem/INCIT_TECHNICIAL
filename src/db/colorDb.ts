import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { ColorType } from './db.type';
import { AppThunk } from '../types/redux.type';
import db from './db';
import { setColorData } from '../redux/reducer/global';

const _getAllColorTable = async(database: SQLiteDatabase) =>{
    const q = 'SELECT * FROM color';
    try {
        const color =  await database.executeSql(q);
        const colors : ColorType[] = [];
        color.forEach((result) =>{
            for(let i = 0; i < result.rows.length; i++){
                colors.push(result.rows.item(i));
            }
        });
        return colors;
    } catch (error) {
        console.error('error get color table from db', error);
        throw error;
    }
};

const getAllColorTable = (): AppThunk => async(dispatch) =>{
    try {
        const database = await db.connectToDb();
        const colors = await _getAllColorTable(database);
        dispatch(setColorData(colors));
    } catch (error) {
        console.error(error)
    }

};


export default{
    getAllColorTable,
};
