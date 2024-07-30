import { Controller } from '@nestjs/common/interfaces';
import PostsService from './posts.service';
import { Request, Response, Router } from 'express';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export default class PostsController implements Controller {
  private path = '/posts';
  public router = Router();
  private PostsService = new PostsService();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.post(this.path, this.createPost);
    this.router.put(`${this.path}/:id`, this.replacePost);
  }

  private getAllPosts = (req: Request, res: Response) => {
    const posts = this.PostsService.getAllPosts();
    res.send(posts);
  };

  private getPostById = (req: Request, res: Response) => {
    const id = req.params.id;
    const post = this.PostsService.getPostById(Number(id));
    res.send(post);
  };

  private createPost = (req: Request, res: Response) => {
    const post: CreatePostDto = req.body;
    const createdPost = this.PostsService.CreatePost(post);
    res.send(createdPost);
  };

  private replacePost = (req: Request, res: Response) => {
    const id = req.params.id;
    const post: UpdatePostDto = req.body;
    const replacedPost = this.PostsService.replacePost(Number(id), post);
    res.send(replacedPost);
  };

  private deletePost = (req: Request, res: Response) => {
    const id = req.params.id;
    this.PostsService.deletePost(Number(id));
    res.sendStatus(200);
  };
}
