import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Fitness', description: 'Category name' })
  readonly name: string;
}
