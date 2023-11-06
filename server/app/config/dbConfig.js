import dotenv from "dotenv";
dotenv.config();

export const dbConfigurations = {
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    db: process.env.DB,
    dialect: "postgres",
    port: process.env.DBPORT,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000,
    }
}
