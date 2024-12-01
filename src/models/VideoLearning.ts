import { BeforeCreate, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { VideoCategories } from "./VideoCategories";
import { VideoSubcategories } from "./VideoSubcategories";
import { v4 as uuidv4 } from "uuid"; 

interface VideoLearningAttributes {
    id: string;
    categoriesId: number;
    subcategoriesId?: number;
    link: string;
    name: string;
    deletedAt?: Date
}

interface VideoLearningCreationAttributes extends Partial<Omit<VideoLearningAttributes, 'id' | 'deletedAt'>> { }

@Table({ tableName: 'video_learning', timestamps: true, paranoid: true })
export class VideoLearning extends Model<VideoLearningAttributes, VideoLearningCreationAttributes> implements VideoLearningAttributes {
    @Column({
        type: DataType.UUID,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: string;

    @Column({
        type: DataType.DATE,
        field: 'created_at'
    })
    createdAt?: Date;

    @Column({
        type: DataType.DATE,
        field: 'updated_at'
    })
    updatedAt?: Date;

    @Column({
        type: DataType.DATE,
        field: 'deleted_at'
    })
    deletedAt?: Date;

    @ForeignKey(() => VideoCategories)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    categoriesId!: number;

    @ForeignKey(() => VideoSubcategories)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    subcategoriesId?: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;


    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    link!: string;

    @BeforeCreate
    static async generateUUID(videoLearning: VideoLearning){
        videoLearning.id = uuidv4()
    }

}