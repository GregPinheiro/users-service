import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'O nome de usuário é obrigatório.' })
  @IsString()
  username: string;
}
