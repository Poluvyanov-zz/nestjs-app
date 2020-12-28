import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { TokenService } from './token/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../../common/strategies/jwt.strategy';
import { JWT_SECRET } from '../../app.constants';
import RefreshTokenEntity from './models/refresh-token.entity';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { UsersExpiredModule } from '../users_expired/users-expired.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    UsersExpiredModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
    TypeOrmModule.forFeature([RefreshTokenEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService, JwtStrategy, TokenService],
})
export class AuthModule {}
