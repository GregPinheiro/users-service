import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../commom/auth/jwt.strategy';
import { AuthService } from './service/auth.service';
import { AuthController } from './auth.controller';
import { LoginUseCase } from './usecase';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LoginUseCase],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
