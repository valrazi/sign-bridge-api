import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { Subscriptions } from '../models/Subscription';
import { VideoCategories } from '../models/VideoCategories';
import { VideoSubcategories } from '../models/VideoSubcategories';
import { VideoLearning } from '../models/VideoLearning';
import { Blogs } from '../models/Blogs';
import { Calendars } from '../models/Calendars';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  models: [User, Role, Subscriptions, VideoCategories, VideoSubcategories, VideoLearning, Blogs, Calendars], // Path to your models
});

User.belongsTo(Role, {foreignKey: 'roleId'})
Role.hasMany(User, {foreignKey: 'roleId'})

Subscriptions.belongsTo(User, {foreignKey:'userId'})
User.hasMany(Subscriptions, {foreignKey:'userId'})

VideoSubcategories.belongsTo(VideoCategories, {foreignKey: 'categoriesId'})
VideoCategories.hasMany(VideoSubcategories, {foreignKey:'categoriesId'})

VideoLearning.belongsTo(VideoCategories, {foreignKey: 'categoriesId'})
VideoLearning.belongsTo(VideoSubcategories, {foreignKey:'subcategoriesId'})
VideoCategories.hasMany(VideoLearning, {foreignKey: 'categoriesId'})
VideoSubcategories.hasMany(VideoLearning, {foreignKey: 'subcategoriesId'})

Blogs.belongsTo(User, {foreignKey:'userId'})
User.hasMany(Blogs, {foreignKey: 'userId'})

Calendars.belongsTo(User, {foreignKey:'userId'})
User.hasMany(Calendars, {foreignKey:'userId'})
export { sequelize };