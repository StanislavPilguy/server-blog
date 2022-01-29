import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface CreateCategoryAttr {
  name: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CreateCategoryAttr> {
  @ApiProperty({ example: '1', description: 'Unique Identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Fitness', description: 'Category name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;
}
