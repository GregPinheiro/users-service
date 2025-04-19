import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILoginParams } from '../../../commom/auth/login-params.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async getToken(payload: ILoginParams) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
