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

import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Subcategory } from './subcategories.model';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@ApiTags('Subcategories')
@Controller('subcategories')
export class SubcategoriesController {
  constructor(private subcategoriesService: SubcategoriesService) {}

  @ApiOperation({ summary: 'Create subcategory' })
  @ApiResponse({ status: 200, type: Subcategory })
  @Roles('1', '2')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoriesService.createSubcategory(createSubcategoryDto);
  }

  @ApiOperation({ summary: 'Get all the subcategory' })
  @ApiResponse({ status: 200, type: [Subcategory] })
  @Get()
  getAll() {
    return this.subcategoriesService.findAll();
  }

  @ApiOperation({ summary: 'Get one subcategory' })
  @ApiResponse({ status: 200, type: Subcategory })
  @Roles('1', '2')
  @UseGuards(RolesGuard)
  @Get(':id')
  getOneSubcategory(@Param('id') id: number) {
    return this.subcategoriesService.getOneSubcategory(id);
  }

  @ApiOperation({ summary: 'Update one subcategory' })
  @ApiResponse({ status: 200, type: Subcategory })
  @Roles('1', '2')
  @UseGuards(RolesGuard)
  @Put(':id')
  replaceCategory(
    @Param('id') id: number,
    @Body() updateSubcategory: UpdateSubcategoryDto,
  ) {
    return this.subcategoriesService.replaceSubcategory(id, updateSubcategory);
  }

  @ApiOperation({ summary: 'Delete subcategory' })
  @ApiResponse({ status: 200, type: Subcategory })
  @Roles('1', '2')
  @UseGuards(RolesGuard)
  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.subcategoriesService.delete(id);
  }
}
