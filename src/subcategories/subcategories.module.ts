import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SubcategoriesController } from './subcategories.controller';
import { SubcategoriesService } from './subcategories.service';
import { Subcategory } from './subcategories.model';

@Module({
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
  imports: [SequelizeModule.forFeature([Subcategory])],
})
export class SubcategoriesModule {}
