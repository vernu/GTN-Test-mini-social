import { Controller, Get, Param } from '@nestjs/common'
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
}
