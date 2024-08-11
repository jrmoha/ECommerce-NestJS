import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ global: true })],
  providers: [ConfigService, JwtService],
})
export class AuthModule {}
