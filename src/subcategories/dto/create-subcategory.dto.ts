import { ApiProperty } from '@nestjs/swagger';

export class CreateSubcategoryDto {
  @ApiProperty({
    example: 'Title subcategory',
    description: 'Subcategory name',
  })
  readonly name: string;
}
