import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../commom/database/entities';
import { CreateUserDto } from '../dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  async update(updateUserDto: CreateUserDto) {
    return this.userRepository.save(updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
