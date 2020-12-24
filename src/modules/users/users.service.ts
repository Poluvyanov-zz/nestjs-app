import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import { CreateUserArgs } from './dto/create.user.args';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findByEmail(userEmail: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ email: userEmail });
  }

  public async findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneOrFail(id);
  }

  public async create(user: CreateUserArgs): Promise<UserEntity> {
    const createUser = await this.userRepository.create(user);
    return this.userRepository.save(createUser);
  }

  public async update(
    id: number,
    newValue: CreateUserArgs,
  ): Promise<UserEntity | null> {
    await this.userRepository.update(id, newValue);
    return this.userRepository.findOne(id);
  }
}
