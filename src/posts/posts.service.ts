import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';
import { FilesService } from '../files/files.service';
import { UpdatePostDto } from './dto/update-post.dto';

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
          msg: 'Create post success',
        };
      }
    } catch (err) {
      throw new HttpException('Not found Post', HttpStatus.NOT_FOUND);
    }
  }

  async getAll() {
    return await this.postRepository.findAll();
  }

  async getOne(id: number) {
    return this.postRepository.findOne({ where: { id } });
  }

  async replacePost(id: number, updatePostDto: UpdatePostDto) {
    try {
      await this.postRepository.upsert(updatePostDto);
      const updatedPost = await this.postRepository.findOne({ where: { id } });
      if (updatedPost) {
        return {
          updatedPost,
          msg: 'Update Post success',
        };
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
          msg: 'Delete post success',
        };
      }
    } catch (err) {
      throw new HttpException('Not found Post', HttpStatus.NOT_FOUND);
    }
  }
}
