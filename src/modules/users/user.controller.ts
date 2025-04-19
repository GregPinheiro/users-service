import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  Controller,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  GetUserListUseCase,
  FindUserByIdUseCase,
} from './usecase';
import { UserDto } from './interface';
import { CreateUserDto, FindUserByIdDto } from './dto';
import { CustomValidationPipe } from '../../commom/pipes';
import { StatusCodeEnum } from '../../commom/enum';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('/users')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@ApiResponse({
  status: StatusCodeEnum.UNAUTHORIZED,
  description: 'Unauthorized',
})
export class UsersController {
  constructor(
    private readonly getUserListUseCase: GetUserListUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: StatusCodeEnum.OK,
    description: 'The list of users',
    type: UserDto,
    isArray: true,
  })
  getUsesList(): Promise<UserDto[]> {
    return this.getUserListUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({
    status: StatusCodeEnum.OK,
    description: 'User data',
    type: UserDto,
  })
  @ApiResponse({
    status: StatusCodeEnum.NOT_FOUND,
    description: 'Usuário com ID X não encontrado.',
  })
  @ApiResponse({
    status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
    description: 'Erro description',
  })
  @UsePipes(CustomValidationPipe)
  async findOne(@Param() params: FindUserByIdDto): Promise<UserDto> {
    return this.findUserByIdUseCase.execute(params.id);
  }

  @Post()
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'Dados do novo usuário a ser criado',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: StatusCodeEnum.CREATED,
    description: 'User created successfully',
    type: UserDto,
  })
  @ApiResponse({
    status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
    description: 'Error description',
  })
  async create(@Body() data: CreateUserDto): Promise<UserDto> {
    return this.createUserUseCase.execute(data);
  }

  @Put(':id')
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Update a user' })
  @ApiBody({
    description: 'Dados do usuário a ser atualizado',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: StatusCodeEnum.OK,
    description: 'User updated successfully',
    type: UserDto,
  })
  @ApiResponse({
    status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
    description: 'Error description',
  })
  @ApiResponse({
    status: StatusCodeEnum.NOT_FOUND,
    description: 'Usuário com ID X não encontrado.',
  })
  async update(
    @Param() params: FindUserByIdDto,
    @Body() data: CreateUserDto,
  ): Promise<UserDto> {
    return this.updateUserUseCase.execute(params.id, data);
  }

  @Delete(':id')
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Deleta um usuário pelo ID' })
  @ApiResponse({
    status: StatusCodeEnum.NO_CONTENT,
    description: 'Usuário deletado com sucesso, sem conteúdo de resposta',
  })
  @ApiResponse({
    status: StatusCodeEnum.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  @ApiResponse({
    status: StatusCodeEnum.UNPROCESSABLE_ENTITY,
    description: 'Erro description',
  })
  async delete(
    @Param() params: FindUserByIdDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.deleteUserUseCase.execute(params.id);

    res.status(StatusCodeEnum.NO_CONTENT).send();
  }
}
