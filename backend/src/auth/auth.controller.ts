import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { apiKey: string }) {
    return this.authService.validateUser(body.apiKey);
  }
}
