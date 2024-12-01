import { Column, DataType, Model, Table } from "sequelize-typescript";

interface VideoCategoriesAttributes {
 id:number;
 name:string;
 deletedAt?:Date   
}

interface VideoCategoriesCreationAttributes extends Partial<Omit<VideoCategoriesAttributes, 'id'|'deletedAt'>>{}

@Table({tableName:'video_categories', timestamps: true, paranoid: true})
export class VideoCategories extends Model<VideoCategoriesAttributes, VideoCategoriesCreationAttributes> implements VideoCategoriesAttributes {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      })
      id!: number;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      name!: string;

      @Column({
        type: DataType.DATE,
        field: 'deleted_at' 
    })
    deletedAt?: Date;
}