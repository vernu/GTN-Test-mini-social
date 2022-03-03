import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('/')
  async getAllUsers() {
    const data = await this.userService.findAll()
    return { data }
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const data = await this.userService.findOne({ _id: id })
    return { data }
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id/follow')
  async followUser(@Param('id') id: string, @Request() req) {
    const data = await this.userService.followUser(id, req.user)
    return { data }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/unfollow')
  async unfollowUser(@Param('id') id: string, @Request() req) {
    const data = await this.userService.unfollowUser(id, req.user)
    return { data }
  }
}
