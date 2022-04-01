import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '../users/users.model';
import { Roles } from './roles-auth.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log-in user' })
  @ApiResponse({ status: 201, type: User })
  @Roles('1', '2')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/log-in')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Registration user' })
  @ApiResponse({ status: 201, type: User })
  @Roles('1', '2')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
