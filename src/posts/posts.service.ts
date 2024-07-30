import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from './entities/post.entity';

@Injectable()
export default class PostsService {
  private lastPostId = 0;
  private posts: Post[] = [];

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  getAllPosts() {
    return this.postsRepository.find();
  }
  getPostBodyId(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return post;
  }
  replacePost(id: number, post: UpdatePostDto) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (!(postIndex > -1)) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    this.posts[postIndex] = post;
    return post;
  }
  createPost(post: CreatePostDto) {
    const newPost = {
      id: ++this.lastPostId,
      ...post,
    };

    this.posts.push(newPost);
    return newPost;
  }

  deletePost(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (!(postIndex > -1)) {
      throw new HttpException('Post not Found', HttpStatus.NOT_FOUND);
    }

    this.posts.splice(postIndex, 1);
  }
}
