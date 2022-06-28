import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './categories.model';
import {Post} from "../posts/posts.model";

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
    return await this.categoryRepository.findAll({
      include: Post
    });
  }

  async getOneCategory(id: number) {
    return await this.categoryRepository.findAll({ where: { id } });
  }

  async updateCategory(id: number, updateCategory: CreateCategoryDto) {
    try {
      await this.categoryRepository.upsert(updateCategory);
      await this.categoryRepository.findOne({where: { id }})
      return {
        updateCategory,
        message: 'Update category name success'
      }
    } catch (err) {
      throw new HttpException('Not found Post', HttpStatus.NOT_FOUND);
    }
  }



  async delete(id: number) {
    try {
      const del = await this.categoryRepository.destroy({ where: { id } });
      if (del) {
        return {
          message: 'Delete category',
        };
      }
    } catch (err) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteAll(categories: number[]) {
    return await this.categoryRepository.destroy({ where: { id: categories } })
  }

}
