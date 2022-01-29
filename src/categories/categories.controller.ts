import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './categories.model';

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
}
