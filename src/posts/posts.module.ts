import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User } from '../users/users.model';
import { Post } from './posts.model';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [SequelizeModule.forFeature([User, Post])],
})
export class PostsModule {}
