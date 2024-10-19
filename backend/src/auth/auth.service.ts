import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(apiKey: string): Promise<any> {
    this.validateApiKey(apiKey);
    const payload = { apiKey };
    return { access_token: this.jwtService.sign(payload) };
  }

  private validateApiKey(apiKey: string): void {
    if (apiKey !== process.env.VALID_API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }
  }
}
