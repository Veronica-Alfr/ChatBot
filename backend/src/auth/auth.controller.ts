import { Controller, Get, UnauthorizedException, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('validate-token')
  async validateToken(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies['authToken'];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
  
    const apiKey = await this.authService.validateToken(token);
    return res.send({ apiKey });
  }

  @Post('login')
  async login(@Body('apiKey') apiKey: string, @Res() res: Response) {
    const token = await this.authService.generateToken(apiKey);

    res.cookie('authToken', token, { httpOnly: true });

    return res.send({ token });
  }
}