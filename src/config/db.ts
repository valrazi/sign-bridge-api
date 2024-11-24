import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Role } from '../models/Role';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  models: [__dirname + '/../models'], // Path to your models
});

User.belongsTo(Role, {foreignKey: 'roleId'})
Role.hasMany(User, {foreignKey: 'roleId'})
export { sequelize };