import { Module } from '@nestjs/common';
import PostsController from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from './entities/post.entity';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export default class PostsModule {
  /* constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {} */
}
