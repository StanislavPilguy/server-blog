import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return {
      role: user.roles,
      user: userDto,
      ...await this.generateToken(user)
    }
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUsersByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.usersService.create({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, role: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUsersByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }
}
