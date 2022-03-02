import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
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
  async getPostById(@Param('id') id: string) {
    const data = await this.postsService.findOne({ _id: id })
    return { data }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createPost(@Body() postData: any) {
    const data = await this.postsService.create(postData)
    return { data }
  }
}
