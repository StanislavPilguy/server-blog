import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async create(userDto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(userDto);
      if (user) {
        return {
          user,
          msg: 'User created',
        };
      }
    } catch (err) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async getAll() {
    return this.userRepository.findAll();
  }

  async getOne(id: number) {
    return this.userRepository.findAll({ where: { id } });
  }

  async replaceUser(id: number, userUpdate: UpdateUserDto) {
    await this.userRepository.upsert(userUpdate);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: number) {
    try {
      const del = await this.userRepository.destroy({ where: { id } });
      if (del) {
        return {
          msg: 'User delete',
        };
      }
    } catch (err) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
