import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import { CreateUserArgs } from './dto/create.user.args';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private eventEmitter: EventEmitter2,
  ) {}

  public async findByEmail(userEmail: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ email: userEmail });
  }

  public async findByEmailToken(
    emailToken: string,
  ): Promise<UserEntity | null> {
    return this.userRepository.findOne({ email_token: emailToken });
  }

  public async findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneOrFail(id);
  }

  public async create(
    user: CreateUserArgs,
    emailToken: string,
  ): Promise<UserEntity> {
    user.email_token = emailToken;
    const createUser = await this.userRepository.create(user);
    this.eventEmitter.emit('user.registered', user);
    return this.userRepository.save(createUser);
  }

  public async update(id: number, newValue) {
    return this.userRepository.update(id, newValue);
  }
}
