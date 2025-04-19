import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/commom/database/entities';
import { UserService } from './service/user.service';
import {
  GetUserListUseCase,
  FindUserByIdUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from './usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UserService,
    GetUserListUseCase,
    FindUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UsersModule {}
