import { HttpModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
