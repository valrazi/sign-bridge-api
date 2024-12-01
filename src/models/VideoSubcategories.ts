import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { VideoCategories } from "./VideoCategories";

interface VideoSubcategoriesAttributes {
    id: number;
    categoriesId?: number;
    name: string;
    deletedAt?: Date
}

interface VideoSubcategoriesCreationAttributes extends Partial<Omit<VideoSubcategoriesAttributes, 'id' | 'deletedAt'>> { }

@Table({ tableName: 'video_subcategories', timestamps: true, paranoid: true })
export class VideoSubcategories extends Model<VideoSubcategoriesAttributes, VideoSubcategoriesCreationAttributes> implements VideoSubcategoriesAttributes {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @ForeignKey(() => VideoCategories)
    @Column({
        type: DataType.INTEGER,
        allowNull:true
    })
    categoriesId?: number;
    
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