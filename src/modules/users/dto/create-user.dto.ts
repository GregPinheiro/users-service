import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
  name: string;

  @ApiPropertyOptional({
    description: 'Email do usuário',
    example: 'joao@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'O email deve ser válido.' })
  email: string;
}
