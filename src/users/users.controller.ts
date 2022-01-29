import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('1')
  @UseGuards(RolesGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @ApiOperation({ summary: 'Issue a role' })
  @ApiResponse({ status: 200 })
  @Roles('1', '3')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getOneUser(@Param('id') id: number) {
    return this.usersService.getOne(id);
  }

  @ApiOperation({ summary: 'Update one user' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  replaceUser(@Body() updateDto: UpdateUserDto, @Param('id') id: number) {
    return this.usersService.replaceUser(id, updateDto);
  }

  @ApiOperation({ summary: 'Delete one user' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
