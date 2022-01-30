import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SubcategoriesController } from './subcategories.controller';
import { SubcategoriesService } from './subcategories.service';
import { Subcategory } from './subcategories.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
  imports: [
    SequelizeModule.forFeature([Subcategory]),
    forwardRef(() => AuthModule),
  ],
})
export class SubcategoriesModule {}
