import { ApiProperty } from '@nestjs/swagger';

export class RolesCreateDto {
  @ApiProperty({ example: '1', description: 'Role value' })
  readonly value: number;
  @ApiProperty({ example: 'Admin', description: 'Role Description' })
  readonly description: string;
}
