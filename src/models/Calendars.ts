import { BeforeCreate, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";

interface CalendarAttributes {
    id:string;
    userId: string;
    title: string;
    eventDate: Date;
    color: string;
    description?:string;
}

interface CalendarCreationAttributes extends Partial<Omit<CalendarAttributes, 'id' | 'deletedAt'>>{}

@Table({tableName: 'calendars', timestamps: true, paranoid: true})
export class Calendars extends Model<CalendarAttributes, CalendarCreationAttributes> implements CalendarAttributes {
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
        type: DataType.STRING, 
        allowNull: false
    })
    title!: string;

    @Column({
        type: DataType.TEXT, 
        allowNull: false
    })
    description?: string;

    @Column({
        type: DataType.DATE,
        field: 'event_date' 
    })
    eventDate!: Date;

    @Column({
        type: DataType.STRING, 
        allowNull: false
    })
    color!: string;

    @BeforeCreate
    static async generateUUID(calendars: Calendars) {
        calendars.id = uuidv4(); // Generate a new UUID
    }
}