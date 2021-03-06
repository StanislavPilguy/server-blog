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

import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './categories.model';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';

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
  @Roles('1', '2')
  @UseGuards(RolesGuard)
  @Get(':id')
  getOneCategory(@Param('id') id: number) {
    return this.categoriesService.getOneCategory(id);
  }

  @ApiOperation({ summary: 'Update one category' })
  @ApiResponse({ status: 200, type: Category })
  @Roles('1', '2')
  @UseGuards(RolesGuard)
  @Put(':id')
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategory: CreateCategoryDto
  ) {
    return this.categoriesService.updateCategory(id, updateCategory);
  }

  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, type: Category })
  @Roles('1', '2')
  @UseGuards(RolesGuard)
  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.categoriesService.delete(id);
  }


  @ApiOperation({ summary: 'Delete categories everising ' })
  @ApiResponse({ status: 200, type: Category})
  @Roles('1', '2')
  @UseGuards(RolesGuard)
  @Post('del')
  delAll(@Body() categories: number[]) {
    return this.categoriesService.deleteAll(categories)
  }

}
