import { Injectable } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../interface';

@Injectable()
export class GetUserListUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(): Promise<UserDto[]> {
    return this.userService.findAll();
  }
}
