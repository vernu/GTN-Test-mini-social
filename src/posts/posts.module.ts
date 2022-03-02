import { Module, Post } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'
import { PostSchema } from './post.schema'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [MongooseModule, PostsService],
})
export class PostsModule {}
