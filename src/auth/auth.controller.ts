import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '../users/users.model';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log-in user' })
  @ApiResponse({ status: 201, type: User })
  @Post('/log-in')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Registration user' })
  @ApiResponse({ status: 201, type: User })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
