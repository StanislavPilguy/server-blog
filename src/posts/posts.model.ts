import { ApiProperty } from '@nestjs/swagger';

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';

interface PostCreateAttr {
  title: string;
  description: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreateAttr> {
  @ApiProperty({ example: '1', description: 'Unique Identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'Title', description: 'Post title' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Description', description: 'Post description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: 'Content', description: 'Post content' })
  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @ApiProperty({ example: 'Image', description: 'Post images' })
  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
