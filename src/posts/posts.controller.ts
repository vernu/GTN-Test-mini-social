import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/')
  async getAllPosts() {
    const data = await this.postsService.findAll()
    return { data }
  }

  @Get('/:id')
  async getPostById(@Param() id: string) {
    const data = await this.postsService.findOne({ _id: id })
    return { data }
  }

  @Post('/')
  async createPost(@Body() postData: any) {
    const data = await this.postsService.create(postData)
    return { data }
  }
}
