import { Injectable } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthDto } from '../dto';

@Injectable()
export class LoginUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute({ username }: AuthDto) {
    const user = { username, sub: '1' };

    return this.authService.getToken(user);
  }
}
