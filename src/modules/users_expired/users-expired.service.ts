import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserExpiredEntity } from './models/user_expired.entity';
import { UserDto } from '../users/dto/user.dto';
import { UserEntity } from '../users/models/user.entity';

@Injectable()
export class UsersExpiredService {
  constructor(
    @InjectRepository(UserExpiredEntity)
    private readonly userExpiredRepository: Repository<UserExpiredEntity>,
  ) {}

  async updateUserExpired(user: UserDto, expired_at: Date) {
    const expiredUser: UserExpiredEntity = await this.userExpiredRepository.findOne(
      {
        where: {
          user: {
            id: user.id,
          },
        },
        relations: ['user'],
      },
    );
    if (expiredUser) {
      expiredUser.expired_at = expired_at;
      await this.userExpiredRepository.update(expiredUser.id, expiredUser);
      return expiredUser;
    }

    const createUserExpired = this.userExpiredRepository.create({
      user,
      expired_at,
    });

    return this.userExpiredRepository.save(createUserExpired);
  }

  public async findByUserId(userId: number): Promise<UserExpiredEntity> {
    return this.userExpiredRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });
  }
}
