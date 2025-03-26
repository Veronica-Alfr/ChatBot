import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  async generateToken(apiKey: string): Promise<string> {
    const hashedApiKey = await bcrypt.hash(apiKey, 10);
    const payload = { apiKey: hashedApiKey };

    return this.jwtService.sign(payload, {
      secret: this.jwtSecret,
    });
  }

  async validateToken(token: string): Promise<string | null> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded.apiKey;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      } else if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      } else {
        throw new UnauthorizedException('Error verifying token');
      }
    }
  }
}