import { Test, TestingModule } from '@nestjs/testing';
import { GetUserListUseCase } from '../usecase';
import { UserService } from '../service/user.service';

describe('GetUserListUseCase', () => {
  let useCase: GetUserListUseCase;
  let userService: UserService;

  const mockUsers = [
    { id: 1, name: 'Gregório' },
    { id: 2, name: 'João' },
  ];

  const mockUserService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserListUseCase,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    useCase = module.get<GetUserListUseCase>(GetUserListUseCase);
    userService = module.get<UserService>(UserService);
  });

  it('deve retornar a lista de usuários', async () => {
    mockUserService.findAll.mockResolvedValue(mockUsers);

    const result = await useCase.execute();

    expect(userService.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe('Gregório');
    expect(result[1].id).toBe(2);
    expect(result[1].name).toBe('João');
    expect(result).toBe(mockUsers);
  });
});
