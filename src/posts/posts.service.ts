import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import UpdatePostDto from './dto/update-post.dto';
import CreatePostDto from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id?: number) {
    const post = await this.postsRepository.findOne({ where: { id } });

    if (!post) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.postsRepository.create(post);

    await this.postsRepository.save(newPost);

    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);

    const updatedPost = await this.postsRepository.findOne({ where: { id } });

    if (!updatedPost) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }
    return updatedPost;
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);

    if (!deleteResponse.affected) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
