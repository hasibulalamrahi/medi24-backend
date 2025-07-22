const {Sequelize} = require("sequelize")
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
process.env.DB_NAME as string,
process.env.DB_USER_NAME as string,
process.env.DB_PASSWORD as string,
{
  host: process.env.DB_REMOTE,
  dialect: "postgres",
  operatorsAliases: false,
  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

sequelize.sync({ alter: true });
sequelize
.authenticate()
.then(()=>console.log("Database is Connected Successfully..!"))
.catch((err:any)=> console.log("Error occured in Connecting Database: ",err))

// export const syncDatabase = async () => {
//     try {
//       await sequelize.sync({ alter: true }); // ✅ Syncs tables & updates schema if changed
//       console.log("✅ Database synchronized successfully.");
//     } catch (error) {
//       console.error("❌ Error syncing database:", error);
//     }
//   };

module.exports = sequelize