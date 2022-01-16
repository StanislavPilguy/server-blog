import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { RolesCreateDto } from './dto/roles-create.dto';
import { Role } from './roles.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Create Role' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() roleDto: RolesCreateDto) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Get Role By Value' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  getRoleByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
