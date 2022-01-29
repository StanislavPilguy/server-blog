import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ example: '1', description: 'Unique Identificator' })
  readonly id: number;

  @ApiProperty({ example: 'Fitness', description: 'Category name' })
  readonly name: string;
}
