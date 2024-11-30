import { setCategoryData } from "../redux/reducer/global";
import { CategoryType } from "../types/global.type";
import { AppDispatch } from "../types/redux.type";
import categoryTable from "./category";
import db from "./db"

const initialTableAndValue = () =>  async(dispatch:AppDispatch) =>{
   try{
    console.log('masuk sini');
    
    const database = await db.connectToDb();
    await db.createTable(database)
    const category : CategoryType[] = await categoryTable.getTableCategory(database)
    dispatch(setCategoryData(category))
   }catch(err){
    console.error(err)
   }
    
}

export default{
    initialTableAndValue
}