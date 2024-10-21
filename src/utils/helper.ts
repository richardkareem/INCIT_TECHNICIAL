export const checkPassword = (str:string) =>{
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}

export const toIdr = (amount:number) =>{
    return new Intl.NumberFormat('id-ID',{
        style:"currency",
        currency:"IDR",
        maximumFractionDigits:0
        
    }).format(amount)
}