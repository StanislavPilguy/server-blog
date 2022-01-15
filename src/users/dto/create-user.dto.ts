import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@ocomp.info', description: 'User Email' })
  readonly email: string;
  @ApiProperty({ example: '123456', description: 'User Password' })
  readonly password: string;
}
