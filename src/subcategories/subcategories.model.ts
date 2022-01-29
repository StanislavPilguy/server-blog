import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { ApiProperty } from '@nestjs/swagger';

import { Category } from '../categories/categories.model';

interface CreateSubcategoryAttr {
  name: string;
}

@Table({ tableName: 'subcategories' })
export class Subcategory extends Model<Subcategory, CreateSubcategoryAttr> {
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

  @ForeignKey(() => Category)
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
