import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Role } from './roles.model';
import { RolesCreateDto } from './dto/roles-create.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private roleRepository: typeof Role,
  ) {}

  async createRole(roleDto: RolesCreateDto) {
    try {
      const role = await this.roleRepository.create(roleDto);
      if (role) {
        return {
          role,
          msg: 'Role created',
        };
      }
    } catch (err) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
  }

  async getRoleByValue(value: number) {
    try {
      return await this.roleRepository.findOne({ where: { value } });
    } catch (e) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
  }
}
