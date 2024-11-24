require("dotenv").config();
const { env } = process;

module.exports = {
  development: {
    dialect: env.DB_DIALECT,
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    seederStorage: "json",
    seederStoragePath: "sequelizeData.json",
    seederStorageTableName: "sequelize_data",
  },
  production: {
    dialect: env.DB_DIALECT,
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    seederStorage: "json",
    seederStoragePath: "sequelizeData.json",
    seederStorageTableName: "sequelize_data",
  },
};
