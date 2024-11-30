import { ResultSet, SQLiteDatabase } from 'react-native-sqlite-storage';
import { CategoryType } from '../types/global.type';

const getTableCategory = async(db: SQLiteDatabase) : Promise<CategoryType[]> => {
    const q = 'SELECT * FROM category;';
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
        console.error('cannot get category from db');
        if(error instanceof Error){
            throw new Error(error.message);
        }
        throw new Error('failed get data category from db');
    }
};

const addCategory = async(db: SQLiteDatabase, category: CategoryType) : Promise<void> =>{
    const q =   `INSERT INTO category (category_name, icon)
                 VALUE (${category.category_name}, ${category.icon})
                `;
    try {
        await db.executeSql(q);
    } catch (error) {
        console.error('Failed to add category table');
        throw error;
    }
};

export default {
    getTableCategory,
    addCategory,
};
