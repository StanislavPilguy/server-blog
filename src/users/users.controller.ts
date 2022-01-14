import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOneUser(@Param('id') id: number) {
    return this.usersService.getOne(id);
  }

  @Put(':id')
  replaceUser(@Body() updateDto: UpdateUserDto, @Param('id') id: number) {
    return this.usersService.replaceUser(id, updateDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
