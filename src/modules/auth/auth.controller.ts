import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthDto } from './dto';
import { LoginUseCase } from './usecase';
import { CustomValidationPipe } from '../../commom/pipes/custom-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('get-token')
  @UsePipes(CustomValidationPipe)
  async getToken(@Body() authDto: AuthDto) {
    return this.loginUseCase.execute(authDto);
  }
}
