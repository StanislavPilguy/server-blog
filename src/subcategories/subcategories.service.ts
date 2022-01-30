import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Subcategory } from './subcategories.model';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectModel(Subcategory)
    private subcategoryRepository: typeof Subcategory,
  ) {}

  async createSubcategory(createSubcategoryDto: CreateSubcategoryDto) {
    try {
      const subcategory = await this.subcategoryRepository.create(
        createSubcategoryDto,
      );
      if (subcategory) {
        return {
          subcategory,
          msg: 'Subcategory created',
        };
      }
    } catch (err) {
      throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    return await this.subcategoryRepository.findAll();
  }

  async getOneSubcategory(id: number) {
    return await this.subcategoryRepository.findOne({
      where: { id },
    });
  }

  async replaceSubcategory(
    id: number,
    updateSubcategory: UpdateSubcategoryDto,
  ) {
    await this.subcategoryRepository.upsert(updateSubcategory);
    const updatedSubcategory = this.subcategoryRepository.findOne({
      where: { id },
    });
    if (updatedSubcategory) {
      return {
        updatedSubcategory,
        msg: 'Update subcategory',
      };
    }
    throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: number) {
    try {
      const del = await this.subcategoryRepository.destroy({ where: { id } });
      if (del) {
        return {
          del,
          msg: 'Delete subcategory',
        };
      }
    } catch (err) {
      throw new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
    }
  }
}
