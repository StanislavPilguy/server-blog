import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({ example: '1', description: 'Unique Identificator' })
  readonly id: number;
  @ApiProperty({ example: 'Title', description: 'Post title' })
  readonly title: string;
  @ApiProperty({ example: 'Description', description: 'Post description' })
  readonly description: string;
  @ApiProperty({ example: 'Content', description: 'Post content' })
  readonly content: string;

  readonly userId: number;
  @ApiProperty({ example: 'Image', description: 'Post images' })
  readonly image: string;
}
