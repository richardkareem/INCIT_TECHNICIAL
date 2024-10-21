import { collection, doc, DocumentData, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../configs";
import { getDoc } from "firebase/firestore";
import { userData } from "../types/global.type";
import { storeData } from "../utils/storeage";

export const updateExpense = async(email:string, data:any) =>{
    try {
        const userRef = doc(db, 'users', email)
        await updateDoc(userRef,{
            expenses: data
    })
    } catch (error) {
        throw error
    }
}
export const getAllExpenseByEmail = async(email:string) : Promise<DocumentData | undefined> =>{
    try {
        const expenseRef = doc(db, 'users', email)
        const expenseSnap = await getDoc(expenseRef)
        if(expenseSnap?.data()){
            return expenseSnap?.data()
        }else{
            return undefined
        }
    } catch (error) {
        throw error
    }
}

export const getAllDataExpenseUsers = async( ) =>{
    try {
        let result : any = []
        const userRef = collection(db, "users")
        const q = query(userRef, where('role', "==", "user"))
        const snapshot = await getDocs(q)
        snapshot.forEach((doc) =>{
            result.push(doc.data())
        })
        return result
    } catch (error) {
        throw error
    }
}