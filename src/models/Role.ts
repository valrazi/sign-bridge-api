import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'roles',
  timestamps: true, // Enable timestamps
})
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true, // Set as primary key
  })
  id!: number; // Auto-incrementing integer ID

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // Ensure role name is unique
  })
  name!: string; // Role name

}