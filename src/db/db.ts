import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import users from './users';
import categoryTable from './category';


enablePromise(true);


const connectToDb = async() =>{

    return openDatabase(
        {name:'myDb.db', createFromLocation:1},
        ()=>{


        },
        (err)=>{
            console.log('err connect to db: ',err);
        }
    );
};

const createTable = async(db:SQLiteDatabase) =>{
    const user = `
    CREATE TABLE IF NOT EXISTS"user" (
	"id_user"	INTEGER NOT NULL,
	"full_name"	TEXT,
	"email"	TEXT UNIQUE,
    "role" TEXT DEFAULT "user",
	"password"	TEXT,
	"token" TEXT,
	PRIMARY KEY("id_user" AUTOINCREMENT)
    )`;
    const category = `
    CREATE TABLE IF NOT EXISTS"category" (
    "id"	INTEGER NOT NULL,
    "category_name"	TEXT,
    "icon"	TEXT,
    PRIMARY KEY("id" AUTOINCREMENT)
    )`;
    const expense = `
    CREATE TABLE IF NOT EXISTS"expense" (
	"id"	INTEGER NOT NULL,
	"id_user"	INTEGER NOT NULL,
	"id_category"	INTEGER NOT NULL,
	"expense_name"	TEXT NOT NULL,
    "create_at" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("id_category") REFERENCES "category"("id"),
	FOREIGN KEY("id_user") REFERENCES "user"("id_user")
    )`;

    const seedUserQuery = 'INSERT INTO user (full_name, email, password, role) VALUES ("admin", "admin@mail.com", "admin", "admin")';
    const seedCategoryQuery1 = 'INSERT INTO category(category_name, icon) VALUES ("makanan", "icon_makanan")';
    const seedCategoryQuery2 = 'INSERT INTO category(category_name, icon) VALUES ("rumah", "icon_makanan")';
    const seedCategoryQuery3 = 'INSERT INTO category(category_name, icon) VALUES ("kendaraan", "icon_makanan")';
    const seedCategoryQuery4 = 'INSERT INTO category(category_name, icon) VALUES ("bulanan", "icon_makanan")';
    try{
        await db.executeSql(user);
        await db.executeSql(category);
        await db.executeSql(expense);

        const dataUser = await users.getTableUser(db);
        const dataCategory = await categoryTable.getTableCategory(db);
        if(dataUser.length === 0 && dataCategory.length === 0){



            await db.executeSql(seedUserQuery);
            await db.executeSql(seedCategoryQuery1);
            await db.executeSql(seedCategoryQuery2);
            await db.executeSql(seedCategoryQuery3);
            await db.executeSql(seedCategoryQuery4);
        }
    }catch(e){
         console.log('error: ',  e);
    }
};



const removeTable = async(db:SQLiteDatabase, tableName:string) =>{
    const query = `DROP TABLE IF EXISTS ${tableName}`;
    try {
      await db.executeSql(query);
      console.log(`success remove table ${tableName}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export default{
    connectToDb,
    createTable,
    removeTable,
};
