import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'ID do usuário',
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Nome do usuário',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    type: String,
    nullable: true,
  })
  email: string | null;
}
