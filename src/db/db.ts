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
    "id_icon" INTEGER NOT NULL,
    "id_color" INTEGER NOT NULL,
    category_name TEXT NOT NULL,
    FOREIGN KEY("id_icon") REFERENCES "icon"("id"),
    FOREIGN KEY("id_color") REFERENCES "color"("id"),
    PRIMARY KEY("id" AUTOINCREMENT)
    )`;
    const expense = `
    CREATE TABLE IF NOT EXISTS"expense" (
	"id"	INTEGER NOT NULL,
	"id_user"	INTEGER NOT NULL,
	"id_category"	INTEGER NOT NULL,
	"expense_name"	TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "create_at" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("id_category") REFERENCES "category"("id"),
	FOREIGN KEY("id_user") REFERENCES "user"("id_user")
    )`;

    const color = `
    CREATE TABLE IF NOT EXISTS"color" (
	"id"	INTEGER,
    "color_name" TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
    )`;

    const icon = `CREATE TABLE IF NOT EXISTS"icon" (
	"id"	INTEGER,
    "icon_name" TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
    )`;

    const seedUserQuery = 'INSERT INTO user (full_name, email, password, role) VALUES ("admin", "admin@mail.com", "admin", "admin")';

    const seedColorQuery = 'INSERT INTO color (color_name) VALUES ("#FFA200")';
    const seedColorQuery2 = 'INSERT INTO color (color_name) VALUES ("#00BFFE")';
    const seedColorQuery3 = 'INSERT INTO color (color_name) VALUES ("#DCD3c8")';
    const seedColorQuery4 = 'INSERT INTO color (color_name) VALUES ("#FFC5D3")';
    const seedColorQuery5 = 'INSERT INTO color (color_name) VALUES ("#98F890")';

    const seedIconQuery = 'INSERT INTO icon (icon_name) VALUES ("icon_makan")';
    const seedIconQuery2 = 'INSERT INTO icon (icon_name) VALUES ("icon_rumah")';
    const seedIconQuery3 = 'INSERT INTO icon (icon_name) VALUES ("icon_kendaraan")';
    const seedIconQuery4 = 'INSERT INTO icon (icon_name) VALUES ("icon_baju")';
    const seedIconQuery5 = 'INSERT INTO icon (icon_name) VALUES ("icon_peliharaan")';

    const seedCategoryQuery1 = 'INSERT INTO category(id_icon, id_color, category_name) VALUES (1, 1, "makanan")';
    const seedCategoryQuery2 = 'INSERT INTO category(id_icon, id_color, category_name) VALUES (2, 2, "rumah")';
    const seedCategoryQuery3 = 'INSERT INTO category(id_icon, id_color, category_name) VALUES (3, 3, "kendaraan")';
    const seedCategoryQuery4 = 'INSERT INTO category(id_icon, id_color, category_name) VALUES (4, 4, "baju")';
    const seedCategoryQuery5 = 'INSERT INTO category(id_icon, id_color, category_name) VALUES (5, 5, "peliharaan")';
    try{
        await db.executeSql(user);
        await db.executeSql(icon);
        await db.executeSql(color);
        await db.executeSql(category);
        await db.executeSql(expense);

        const dataUser = await users.getTableUser(db);
        const dataCategory = await categoryTable.getTableCategory(db);
        if(dataUser.length === 0 && dataCategory.length === 0){

            await db.executeSql(seedUserQuery);

            await db.executeSql(seedColorQuery);
            await db.executeSql(seedColorQuery2);
            await db.executeSql(seedColorQuery3);
            await db.executeSql(seedColorQuery4);
            await db.executeSql(seedColorQuery5);

            await db.executeSql(seedIconQuery);
            await db.executeSql(seedIconQuery2);
            await db.executeSql(seedIconQuery3);
            await db.executeSql(seedIconQuery4);
            await db.executeSql(seedIconQuery5);

            await db.executeSql(seedCategoryQuery1);
            await db.executeSql(seedCategoryQuery2);
            await db.executeSql(seedCategoryQuery3);
            await db.executeSql(seedCategoryQuery4);
            await db.executeSql(seedCategoryQuery5);
        }
    }catch(e){
         console.error('error membuat table `\\` seed : ',  e);
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
