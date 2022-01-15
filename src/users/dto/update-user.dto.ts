import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: '1', description: 'Unique Identificator' })
  id?: number;
  @ApiProperty({ example: 'user@ocomp.info', description: 'User Email' })
  email: string;
  @ApiProperty({ example: '123456', description: 'User Password' })
  password: string;
}
