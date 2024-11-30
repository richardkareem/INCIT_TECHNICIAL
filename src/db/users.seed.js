import users from "./users"


const usr = {
        fullName:"richard",
        role:"admin",
        email:"admin@gmail.com",
        password:"admin"
    }




const userSeed = async(db) =>{
  try {
    
    await users.createUser(db, usr)
    console.log('berhasil membuat user seed')
  } catch (error) {
      console.log(error);
  }
}

export default userSeed