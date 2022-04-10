import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, Length} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Title', description: 'Post title' })
  @IsNotEmpty()
  @Length(6, 32)
  readonly title: string;
  @ApiProperty({ example: 'Description', description: 'Post description' })
  @IsNotEmpty()
  @Length(6, 255)
  readonly description: string;
  @ApiProperty({ example: 'Content', description: 'Post content' })
  @IsNotEmpty()
  readonly content: string;
  @IsNotEmpty()
  readonly userId: number;
  @IsNotEmpty()
  readonly categoryId: number;
}
