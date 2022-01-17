import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@ocomp.info', description: 'User Email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: ' Incorect Email' })
  readonly email: string;
  @ApiProperty({ example: '123456', description: 'User Password' })
  @IsString({ message: 'Must be a string' })
  @Length(6, 32, { message: 'Not less than 6 and not more than 32 characters' })
  readonly password: string;
}
