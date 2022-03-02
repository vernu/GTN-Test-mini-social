import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDTO: any) {
    return await this.authService.login(loginDTO)
  }

  @Post('/register')
  async register(@Body() registerDTO: any) {
    return await this.authService.register(registerDTO)
  }
}
