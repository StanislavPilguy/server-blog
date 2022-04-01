import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './categories.model';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoryRepository: typeof Category,
  ) {}
  async create(createCategory: CreateCategoryDto) {
    try {
      const category = await this.categoryRepository.create(createCategory);
      if (category) {
        return {
          category,
          msg: 'Create category',
        };
      }
    } catch (err) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }

  async getAll() {
    return await this.categoryRepository.findAll();
  }

  async getOneCategory(id: number) {
    return await this.categoryRepository.findAll({ where: { id } });
  }

  async replaceCategory(id: number, updateCategory: UpdateCategoryDto) {
    await this.categoryRepository.upsert(updateCategory);
    const updatedCategory = await this.categoryRepository.findOne({
      where: { id },
    });
    if (updatedCategory) {
      return {
        updatedCategory,
        massage: 'Update Category',
      };
    }
    throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: number) {
    try {
      const del = await this.categoryRepository.destroy({ where: { id } });
      if (del) {
        return {
          massage: 'Delete category',
        };
      }
    } catch (err) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }
}
