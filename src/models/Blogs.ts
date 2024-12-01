import { Table, Model, Column, DataType, ForeignKey, BeforeCreate } from "sequelize-typescript";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";
interface BlogsAttributes {
    id:string;
    userId:string;
    title: string;
    content:string;
    deletedAt?: Date;
    backgroundImage:string
}

interface BlogsCreationAttributes extends Partial<Omit<BlogsAttributes, 'id' | 'deletedAt'>> {}

@Table({tableName: 'blogs', timestamps: true, paranoid: true})
export class Blogs extends Model<BlogsAttributes, BlogsCreationAttributes> implements BlogsAttributes {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false
    })
    id!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    userId!: string;

    @Column({
        type: DataType.DATE,
        field: 'updated_at' 
    })
    updatedAt?: Date;
    
    @Column({
        type: DataType.DATE,
        field: 'created_at' 
    })
    createdAt?: Date;

    @Column({
        type: DataType.DATE,
        field: 'deleted_at' 
    })
    deletedAt?: Date;

    @Column({
        type: DataType.TEXT, 
        allowNull: false
    })
    title!: string;

    @Column({
        type: DataType.TEXT, 
        allowNull: false
    })
    content!: string;

    @Column({
        type: DataType.TEXT, 
        field: 'background_image'
    })
    backgroundImage!: string;

    @BeforeCreate
    static async generateUUID(blogs: Blogs) {
        blogs.id = uuidv4(); // Generate a new UUID
    }
}