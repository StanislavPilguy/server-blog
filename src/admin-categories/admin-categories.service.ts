import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {AdminCategories} from "./admin-categories.model";
import {CreateAdminCategoriesDto} from "./dto/create-admin-categories.dto";
import {UpdateAdminCategoriesDto} from "./dto/update-admin-categories.dto";

@Injectable()
export class AdminCategoriesService {

    constructor(
        @InjectModel(AdminCategories)
        private adminCategoriesRepository: typeof AdminCategories
    ) {}

    async create(createAdminCategories: CreateAdminCategoriesDto) {
        try {
            const adminCategories = await this.adminCategoriesRepository.create(createAdminCategories);
            if (adminCategories) {
                return {
                    adminCategories,
                    msg: 'Create adminCategories',
                };
            }
        } catch (err) {
            throw new HttpException('Admin Category not found', HttpStatus.NOT_FOUND);
        }
    }

    async getAll() {
        return await this.adminCategoriesRepository.findAll();
    }

    async getOneAdminCategory(id: number) {
        return await this.adminCategoriesRepository.findAll({ where: { id } });
    }

    async updateAdminCategory(id: number, updateAdminCategories: UpdateAdminCategoriesDto) {
      try {
          await this.adminCategoriesRepository.upsert(updateAdminCategories);
          await this.adminCategoriesRepository.findOne({ where: { id } });
          return {
              updateAdminCategories,
              message: 'update admin category success!',
          }
      } catch (err) {
          throw new HttpException('Admin Category not found', HttpStatus.NOT_FOUND);
      }
    }

    async delete(id: number) {
        try {
            const del = await this.adminCategoriesRepository.destroy({ where: { id } });
            if (del) {
                return {
                    message: 'Delete admin category',
                };
            }
        } catch (err) {
            throw new HttpException('Admin Category not found', HttpStatus.NOT_FOUND);
        }
    }
}
