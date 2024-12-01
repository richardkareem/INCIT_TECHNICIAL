import { ResultSet, SQLiteDatabase } from 'react-native-sqlite-storage';
import { CategoryType } from '../types/global.type';
import { AddCategoryType } from './db.type';
import { AppThunk } from '../types/redux.type';
import { setCategoryData } from '../redux/reducer/global';

const getTableCategory = async(db: SQLiteDatabase) : Promise<CategoryType[]> => {
    const q = `
    SELECT category.id, category_name, icon.icon_name as icon, color.color_name as color
    FROM category
    INNER JOIN icon ON category.id_icon = icon.id
    INNER JOIN color ON category.id_color = color.id;
    `;
    try {
       let resultCategoty : CategoryType[] = [];
       const category = await db.executeSql(q);
       category.forEach((result: ResultSet) =>{
        for(let i = 0; i < result.rows.length; i++){
            resultCategoty.push(result.rows.item(i));
        }
       });
       return resultCategoty;
    } catch (error: Error | unknown) {
        console.error('cannot get category from db', error);
        if(error instanceof Error){
            throw new Error(error.message);
        }
        throw new Error('failed get data category from db', );
    }
};

const addCategory = (db: SQLiteDatabase, category: AddCategoryType) : AppThunk => async(dispatch) =>{
    const q =   `INSERT INTO category (category_name, id_icon, id_color)
                 VALUES (?,?,?)
                `;
    const values = [category.category_name, category.id_icon, category.id_color];
    try {
        await db.executeSql(q, values);
        const categorys = await getTableCategory(db);
        dispatch(setCategoryData(categorys));
    } catch (error) {
        console.error('Failed to add category table');
        throw error;
    }
};

export default {
    getTableCategory,
    addCategory,
};
