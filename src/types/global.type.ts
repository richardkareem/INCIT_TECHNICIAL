
export type RegisterData = {
       fullname: string;
       email:string;
       password: string;
       rePassword:string
}

export type userData = {
       id_user: number;
       full_name: string;
       email:string;
       role: string;
       token: string;
       password: string;
}

export type SetExpenseType = {
       day: string,
       note:string,
       expense:string
       category: string
       color: string
   }
export type ExpenseType = {
       id: number,
       id_category:number,
       expense: string,
       amount: string,
       category: string
       color: string,
       create_at: any,
}

export type CategoryType = {
       category_name: string,
       icon: string,
       color?: string,
       id?: number,
}
