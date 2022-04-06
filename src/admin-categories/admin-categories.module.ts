import {forwardRef, Module} from '@nestjs/common';
import { AdminCategoriesController } from './admin-categories.controller';
import { AdminCategoriesService } from './admin-categories.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {AuthModule} from "../auth/auth.module";
import {AdminCategories} from "./admin-categories.model";

@Module({
  controllers: [AdminCategoriesController],
  providers: [AdminCategoriesService],
  imports: [
    SequelizeModule.forFeature([AdminCategories]),
    forwardRef(() => AuthModule),
  ]
})
export class AdminCategoriesModule {}
