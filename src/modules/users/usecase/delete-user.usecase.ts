import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(id: number): Promise<void> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }

    await this.userService.remove(id);
  }
}
