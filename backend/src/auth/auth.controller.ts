import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('apiKey') apiKey: string, @Res() res: Response) {
    const token = await this.authService.generateToken(apiKey);

    res.cookie('authToken', token, { httpOnly: true, secure: true });

    return res.send({ message: 'Sucessfully logged in' });
  }
}