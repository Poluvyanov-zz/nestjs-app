import { HttpModule, Module } from '@nestjs/common';
import { UsersExpiredService } from './users-expired.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserExpiredEntity } from './models/user_expired.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([UserExpiredEntity])],
  providers: [UsersExpiredService],
  exports: [UsersExpiredService],
})
export class UsersExpiredModule {
}
