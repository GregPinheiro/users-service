import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto';
@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersService: UserService) {}

  async execute(id: number, updateUserDto: CreateUserDto) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }

    const newData = {
      ...user,
      ...updateUserDto,
    };

    return this.usersService.update(newData);
  }
}
