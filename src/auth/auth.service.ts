import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  signAccessToken(user: Partial<User>) {
    const payload = {
      sub: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload, {
      expiresIn: '15m',
      privateKey: this.configService.get('ACCESS_TOKEN_PRIVATE_KEY'),
      algorithm: 'RS256',
    });
  }
  verifyRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        publicKey: this.configService.get('ACCESS_TOKEN_PUBLIC_KEY'),
      });
    } catch {
      throw new UnauthorizedException();
    }
  }
  refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        publicKey: this.configService.get('REFRESH_TOKEN_PUBLIC_KEY'),
      });

      return this.signAccessToken({
        _id: payload.sub,
        username: payload.username,
        email: payload.email,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  signRefreshToken(user: User) {
    const payload = {
      sub: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
      privateKey: this.configService.get('REFRESH_TOKEN_PRIVATE_KEY'),
      algorithm: 'RS256',
    });
  }
}
