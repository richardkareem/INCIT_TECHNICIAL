import { collection, doc, DocumentData, DocumentReference, getDoc , getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "../configs"
import { RegisterData } from "../types/global.type"
// import * as bcrypt from 'bcrypt';
import { checkPassword } from "../utils/helper";
import uuid from "react-native-uuid"
import { storeData } from "../utils/storeage";

const addToken = async(ref: DocumentReference<DocumentData, DocumentData>) =>{
    await updateDoc(ref, {
        token: uuid.v4()
    })
}



export const getAllUserByEmail = async(email:string, password:string, onSuccess: ()=> void) =>{
    try {
        // const q = query(collection(db, "users"), where("email", "==", email))
        // const querySnapshot =  await getDocs(q)
        const userRef = doc(db, "users", email)
        const userSnap = await getDoc(userRef)

        if(userSnap.exists()){
           if (userSnap.data()?.password === password){
                await addToken(userRef)
                const data = userSnap?.data();
                const profile = {
                    fullname:data?.fullname,
                    email:data?.email,
                    role:data?.role,
                    token:data?.token
                }
                await storeData('profile', JSON.stringify(profile))
                onSuccess()
           }else{
            throw new Error("email or password is incorrect")
           }
        }else{
            throw new Error("email or password is incorrect")
        }
    } catch (error ) {
        throw error
    }
    
}

export const registerUser = async(data:RegisterData) =>{
    try {
        if(data.password !== data.rePassword) throw new Error("Password not match")
        const userRef = doc(db, "users", data.email)
        const userSnap = await getDoc(userRef);
        if(!userSnap.exists()){
            const datas = {
                email:data.email,
                fullname:data.fullname,
                password:data.password,
                role:"user",
                token:""
            }
            await setDoc(doc(db, "users", data?.email), datas);
        }else{
            throw new Error("email already registered")
        }
    } catch (error) {
        throw error
    }
}

export const editUser = async(email: string, currentData:any) =>{
try {
    const userRef = doc(db, "users", email)
    const userSnap = await getDoc(userRef);
    if(userSnap.exists()){
        await setDoc(doc(db,  "users", email), currentData)
    }else{
        throw new Error("User Not Found")
    }

} catch (error) {
    throw error
}
}


