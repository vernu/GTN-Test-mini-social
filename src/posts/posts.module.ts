import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'
import { UsersModule } from 'src/users/users.module'
import { PostLike, PostLikeSchema } from './post-like.schema'
import { Post, PostSchema } from './post.schema'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: PostLike.name,
        schema: PostLikeSchema,
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [MongooseModule, PostsService],
})
export class PostsModule {}
