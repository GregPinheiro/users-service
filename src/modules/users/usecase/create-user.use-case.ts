import { Injectable } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto';
import { User } from '../../../commom/database/entities';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }
}
