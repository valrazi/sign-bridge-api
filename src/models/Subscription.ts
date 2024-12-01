import { Table, Model, Column, DataType, ForeignKey, BeforeCreate } from "sequelize-typescript";
import { User } from "./User";
import { v4 as uuidv4 } from "uuid";
interface SubscriptionAttributes {
    id:string;
    userId:string;
    price:number;
    startedAt:Date;
    endedAt:Date;
    transferProof:string;
    isValid:boolean;
    validatedAt:Date;
    deletedAt?: Date;
}

interface SubscriptionCreationAttributes extends Partial<Omit<SubscriptionAttributes, 'id' | 'deletedAt'>> {}

@Table({tableName: 'subscriptions', timestamps: true, paranoid: true})
export class Subscriptions extends Model<SubscriptionAttributes, SubscriptionCreationAttributes> implements SubscriptionAttributes {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4, // Automatically generate UUID
        primaryKey: true,
        allowNull: false // Set to false to ensure every user has an ID
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
        field: 'deleted_at' 
    })
    deletedAt?: Date;

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
        type: DataType.NUMBER, 
        allowNull: false
    })
    price!: number;

    @Column({
        type: DataType.DATE, 
        allowNull: false,
        field: 'started_at'
    })
    startedAt!: Date;

    @Column({
        type: DataType.DATE, 
        allowNull: false,
        field: 'ended_at'
    })
    endedAt!: Date;

    @Column({
        type: DataType.STRING, 
        allowNull: false,
        field: 'transfer_proof'
    })
    transferProof!: string;

    @Column({
        type: DataType.BOOLEAN, 
        allowNull: false,
        field:'is_valid'
    })
    isValid!: boolean;

    @Column({
        type: DataType.DATE, 
        field:'validated_at'
    })
    validatedAt!: Date;

    @BeforeCreate
    static async generateUUID(subcriptions: Subscriptions) {
        subcriptions.id = uuidv4(); // Generate a new UUID
    }
}