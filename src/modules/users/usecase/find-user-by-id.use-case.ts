import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../interface';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(id: number): Promise<UserDto> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    return user;
  }
}
