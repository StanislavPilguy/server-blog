import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminCategoriesDto {
    @ApiProperty({example: '1', description: 'Unique Idintificator'})
    readonly id?: number;
    @ApiProperty({ example: 'Admin categories', description: 'Admin category name' })
    readonly name: string;
}