import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './categories.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    SequelizeModule.forFeature([Category]),
    forwardRef(() => AuthModule),
  ],
  exports: [],
})
export class CategoriesModule {}
