import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async create(userDto: CreateUserDto) {
    const user = await this.userRepository.create(userDto);
    const role = await this.rolesService.getRoleByValue('0');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAll() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getOne(id: number) {
    return this.userRepository.findAll({ where: { id } });
  }

  async updateUser(id: number, userUpdate: CreateUserDto) {
    try {
      await this.userRepository.upsert(userUpdate);
      await this.userRepository.findOne({ where: { id } });
      return {
        userUpdate,
        message: 'update user success!'
      }
    } catch (err) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number) {
    try {
      const del = await this.userRepository.destroy({ where: { id } });
      if (del) {
        return {
          message: 'User delete success!',
        };
      }
    } catch (err) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async getUsersByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId);
    const role = await this.rolesService.getRoleByValue(addRoleDto.value);
    if (role && user) {
      await user.$add('roles', role.id);
      return addRoleDto;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }
}
