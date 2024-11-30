// import db from "./db"
// //email TEXT UNIQUE,
// // password TEXT,
// // role TEXT DEFAULT "user",
// // PRIMARY KEY(id)
const createUser = async (db, user) => {

    const insertQuery = `
     INSERT INTO user (full_name, role, email, password, role)
     VALUES (?, ?, ?, ?, ?)
   `;
    const values = [
      user.fullName,
      user.role,
      user.email,
      user.password,
      user.role,
    ];
    try {
        let emailCount = 0;
       const count =  await db.executeSql(
            `SELECT COUNT(email)
             FROM User
             WHERE email = "${user.email}"
            `);

        count.forEach((result) =>{
            for (let index = 0; index < result.rows.length; index++) {
                console.log('length: ', result.rows.length);
                console.log('count: ', result.rows.item(index));

               emailCount =  result.rows.item(index)['COUNT(email)'];
               console.log( result.rows.item(index)['COUNT(email)']);

            }
        });


        console.log({emailCount});
        if(emailCount > 0){
            throw new Error('Email Already Exist');
        }
      await db.executeSql(insertQuery, values);
    } catch (error) {
      throw new Error(error?.message);
    }
  };

  const findUserByEmail = async(db, email) =>{
    const query = `SELECt * FROM User WHERE email = "${email}"`;
    try{
        const res = await db.executeSql(query);
        if(res[0]?.rows.length){
            return res[0]?.rows.item(0);
        }else{
            throw new Error('Password / email salah');
        }
    }catch(e) {
        throw new Error(e?.message || 'failed get data from db');
    }
  };

  const getTableUser = async(db) =>{
    try{
        const tableNames = [];
        const results = await db.executeSql(
            'SELECT * FROM user'
          );
        results?.forEach((result) => {
        for (let index = 0; index < result.rows.length; index++) {
            tableNames.push(result.rows.item(index));
        }
        });
        return tableNames;
    }catch(e){
        console.error(e);
        throw e;
    }
};
const updateTokenUser = async(db, id, token) =>{
  const q = `UPDATE user set token = ? where id_user = ${id};`;
  const values = [token];
  try {
    await db.executeSql(q, values);
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

const updateUser = async(db, id_user, full_name, password) =>{
  const q = `UPDATE user set full_name="${full_name}", password="${password}" WHERE id_user = ${id_user};`;
  console.log(q);
  try {
    await db.executeSql(q);
  } catch (error) {
    console.error('failed to update user db ', error);
    throw error;
  }
};



  export default {
    createUser,
    getTableUser,
    findUserByEmail,
    updateTokenUser,
    updateUser,
  };

