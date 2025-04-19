import { Test, TestingModule } from '@nestjs/testing';
import { FindUserByIdUseCase } from '../usecase';
import { UserService } from '../service/user.service';
import { NotFoundException } from '@nestjs/common';

describe('FindUserByIdUseCase', () => {
  let useCase: FindUserByIdUseCase;
  let userService: UserService;

  const mockUser = { id: 1, name: 'Gregório' };

  const mockUserService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdUseCase,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    useCase = module.get<FindUserByIdUseCase>(FindUserByIdUseCase);
    userService = module.get<UserService>(UserService);
  });

  it('deve retornar o usuário encontrado', async () => {
    mockUserService.findOne.mockResolvedValue(mockUser);

    const result = await useCase.execute(mockUser.id);

    expect(result).toEqual(mockUser);
    expect(userService.findOne).toHaveBeenCalledWith(mockUser.id);
  });

  it('deve lançar um erro se o usuário não for encontrado', async () => {
    mockUserService.findOne.mockResolvedValue(null);

    await expect(useCase.execute(2)).rejects.toThrow(NotFoundException);
  });
});
