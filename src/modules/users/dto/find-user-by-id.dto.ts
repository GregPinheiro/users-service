import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindUserByIdDto {
  @Type(() => Number)
  @IsInt({ message: 'O id deve ser um número inteiro.' })
  @Min(1, { message: 'O id deve ser no mínimo 1.' })
  id: number;
}
