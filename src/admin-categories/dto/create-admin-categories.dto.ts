import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminCategoriesDto {
    @ApiProperty({example: '1', description: 'Unique Idintificator'})
    readonly id?: number;
    @ApiProperty({ example: 'Updete admin categories', description: 'Admin category name' })
    readonly name: string;
}