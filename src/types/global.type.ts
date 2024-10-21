import { DateType } from "react-native-ui-datepicker";

export type RegisterData = {
       fullname: string;
       email:string;
       password: string;
       rePassword:string
}

export type userData = {
       fullname: string;
       email:string;
       role: string;
       token: string;
       expenses: ExpenseType[],
       totalExpenses: string

}

export type SetExpenseType = {
       day: string,
       note:string,
       expense:string
       category: string
   }
export type ExpenseType = {
       create_at: any,
       expense: string,
       amount: string,
       category: string
}