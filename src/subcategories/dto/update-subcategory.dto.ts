import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubcategoryDto {
  @ApiProperty({ example: '1', description: 'Unique Identificator' })
  readonly id: number;

  @ApiProperty({
    example: 'Title subcategory',
    description: 'Subcategory name',
  })
  readonly name: string;
}
