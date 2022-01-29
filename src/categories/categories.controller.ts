import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './categories.model';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 200, type: Category })
  @Post()
  createCategory(@Body() createCategory: CreateCategoryDto) {
    return this.categoriesService.create(createCategory);
  }

  @ApiOperation({ summary: 'Get all the category' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  getAllCategory() {
    return this.categoriesService.getAll();
  }

  @ApiOperation({ summary: 'Get one category' })
  @ApiResponse({ status: 200, type: Category })
  @Get(':id')
  getOneCategory(@Param('id') id: number) {
    return this.categoriesService.getOneCategory(id);
  }

  @ApiOperation({ summary: 'Update one category' })
  @ApiResponse({ status: 200, type: Category })
  @Put(':id')
  replaceCategory(
    @Param('id') id: number,
    @Body() updateCategory: UpdateCategoryDto,
  ) {
    return this.categoriesService.replaceCategory(id, updateCategory);
  }

  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, type: Category })
  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.categoriesService.delete(id);
  }
}
