import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Title', description: 'Post title' })
  readonly title: string;
  @ApiProperty({ example: 'Description', description: 'Post description' })
  readonly description: string;
  @ApiProperty({ example: 'Content', description: 'Post content' })
  readonly content: string;
  readonly userId: number;
}
