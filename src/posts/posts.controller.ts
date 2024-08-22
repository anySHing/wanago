import { NextFunction, Request, Response } from 'express';
import CreatePostDto from './dto/create-post.dto';
import UpdatePostDto from './dto/update-post.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { ExceptionsLoggerFilter } from 'src/utils/exceptionsLogger.filter';
import { FindOneParams } from 'src/utils/findOneParams';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
@Controller('post')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.createPost(post, req.user);
  }

  getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const post = await this.postsService.getPostById();
      res.send(post);
    } catch (e) {
      const err = e as Error;
      next(err);
    }

    const posts = this.postsService.getAllPosts();
    res.send(posts);
  };

  @Get(':id')
  @UseFilters(ExceptionsLoggerFilter)
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(Number(id));
  }

  private replacePost = (req: Request, res: Response) => {
    const id = req.params.id;
    const post: UpdatePostDto = req.body;
    const replacedPost = this.postsService.updatePost(Number(id), post);
    res.send(replacedPost);
  };

  private deletePost = (req: Request, res: Response) => {
    const id = req.params.id;
    this.postsService.deletePost(Number(id));
    res.sendStatus(200);
  };
}
