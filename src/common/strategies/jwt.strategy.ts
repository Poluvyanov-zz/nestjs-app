import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { JwtPayload } from '../interfaces/jwt-payload';
import { UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../../modules/auth/token/token.service';
import { JWT_SECRET } from '../../app.constants';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const result = await this.tokenService.validatePayload(payload);
    const user = await this.userService.findById(result);
    if (!result || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
