import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ status: 200, type: Post })
  @Roles('1', '2')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() createPostDto: CreatePostDto, @UploadedFile() image) {
    return this.postsService.createPost(createPostDto, image);
  }

  @ApiOperation({ summary: 'Get all post' })
  @ApiResponse({ status: 200, type: [Post] })
  @Get()
  getAllPost() {
    return this.postsService.getAll();
  }

  @ApiOperation({ summary: 'Get one post' })
  @ApiResponse({ status: 200, type: Post })
  @Get(':id')
  getOnePost(@Param('id') id: number) {
    return this.postsService.getOne(id);
  }

  @ApiOperation({ summary: 'Update one post' })
  @ApiResponse({ status: 200, type: Post })
  @Roles('1', '2')
  @UseGuards(RolesGuard)
  @Put(':id')
  replacePost(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.replacePost(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Delete Post' })
  @ApiResponse({ status: 200, type: Post })
  @Roles('1', '2')
  @UseGuards(RolesGuard)
  @Delete(':id')
  destroyPost(@Param('id') id: number) {
    return this.postsService.delete(id);
  }
}
