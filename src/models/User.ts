import { BeforeCreate, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"; // Importing uuid with alias for clarity
import { hashPassword } from "../utils/hashPassword";
import { Role } from "./Role";

// Define the attributes for the User model
interface UserAttributes {
    id: string; // UUID
    email: string;
    fullName?:string;
    password: string;
    phoneNumber?: string;
    placeBirth?: string;
    dateBirth: Date;
    securityQuestion?: string;
    securityAnswer?: string;
    deletedAt?: Date; // This will be managed by Sequelize's paranoid option
    roleId: number;
}

// Define the creation attributes (optional properties)
interface UserCreationAttributes extends Partial<Omit<UserAttributes, 'id' | 'deletedAt'>> {}

// Define the User model class
@Table({ tableName: 'users', timestamps: true, paranoid: true })
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4, // Automatically generate UUID
        primaryKey: true,
        allowNull: false // Set to false to ensure every user has an ID
    })
    id!: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW, 
        allowNull: false,
        field: 'created_at' 
    })
    createdAt?: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW, 
        allowNull: false,
        field: 'updated_at' 
    })
    updatedAt?: Date;

    @Column({
        type: DataType.DATE,
        field: 'deleted_at' 
    })
    deletedAt?: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'full_name' // Ensure email is unique
    })
    fullName!: string;


    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true // Ensure email is unique
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        field: 'phone_number'
    })
    phoneNumber?: string;

    @Column(({
        type: DataType.STRING,
        field: 'place_birth'
    }))
    placeBirth?: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field:'date_birth'
    })
    dateBirth!: Date;

    @Column(({
        type: DataType.STRING,
        field: 'security_question'
    }))
    securityQuestion?: string;

    @Column(({
        type: DataType.STRING,
        field: 'security_answer'
    }))
    securityAnswer?: string;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    roleId!: number;

    @BeforeCreate
    static async generateUUID(user: User) {
        user.id = uuidv4(); // Generate a new UUID
    }

    @BeforeCreate
    static async hashPassword(user: User) {
        user.password = hashPassword(user.password); // Hash the password before saving
    }
}
