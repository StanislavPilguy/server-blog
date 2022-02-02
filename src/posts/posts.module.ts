import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User } from '../users/users.model';
import { Post } from './posts.model';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([User, Post]),
    FilesModule,
    forwardRef(() => AuthModule),
  ],
})
export class PostsModule {}
