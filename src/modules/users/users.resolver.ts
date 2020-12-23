import { HttpService, Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserEntity } from './models/user.entity';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private httpService: HttpService,
  ) {}
}
