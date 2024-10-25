import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(apiKey: string): Promise<string> {
    const hashedApiKey = await bcrypt.hash(apiKey, 10);
    const payload = { apiKey: hashedApiKey };

    return this.jwtService.sign(payload);
  }

  async validateToken(token: string): Promise<string | null> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded.apiKey;
    } catch (err) {
      return null;
    }
  }
}