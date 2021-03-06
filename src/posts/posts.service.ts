import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';
import { FilesService } from '../files/files.service';
import { UpdatePostDto } from './dto/update-post.dto';
import {Category} from "../categories/categories.model";
import {User} from "../users/users.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postRepository: typeof Post,
    private filesService: FilesService,
  ) {}

  async createPost(createPostDto: CreatePostDto, image: any) {
    try {
      const fileName = await this.filesService.createFile(image);
      const post = await this.postRepository.create({
        ...createPostDto,
        image: fileName,
      });
      if (post) {
        return {
          post,
          message: 'Create post success',
        };
      }
    } catch (err) {
      throw new HttpException('Not found Post', HttpStatus.NOT_FOUND);
    }
  }

  async getAll(res) {
    // eslint-disable-next-line prefer-const
    let { categoryId, limit, page } = res.query;
    page = page || 1;
    limit = limit || 9;
    const offset = page * limit - limit;
    let post;
    if (!categoryId) {
      post = await this.postRepository.findAndCountAll({ limit, offset, include: [
          { model: Category },
          { model: User }
        ] });
    }
    if (categoryId) {
      post = await this.postRepository.findAndCountAll({
        where: { categoryId },
        limit,
        offset,
        include: [
          { model: Category },
          { model: User }
        ]
      });
    }
    return post;
  }

  async getOneByNane(name: string) {
    // @ts-ignore
    return this.postRepository.findOne({ where: { title: name } });
  }

  async getOne(id: number) {
    return this.postRepository.findOne({ where: { id } });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    try {
      await this.postRepository.upsert(updatePostDto);
      await this.postRepository.findOne({ where: { id } });
      return {
        updatePostDto,
        message: 'Update Post success',
      }
    } catch (err) {
      throw new HttpException('Not found Post', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number) {
    try {
      const del = await this.postRepository.destroy({ where: { id } });
      if (del) {
        return {
          message: 'Delete post success',
        };
      }
    } catch (err) {
      throw new HttpException('Not found Post', HttpStatus.NOT_FOUND);
    }
  }
}
