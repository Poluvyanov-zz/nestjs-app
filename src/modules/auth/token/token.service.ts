import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import RefreshTokenEntity from '../models/refresh-token.entity';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { JwtPayload } from '../../../common/interfaces/jwt-payload';
import { v1 as uuidv1 } from 'uuid';
import moment from 'moment';
import {
  JWT_ACCESS_TOKEN_TTL,
  JWT_REFRESH_TOKEN_TTL,
  JWT_SECRET,
} from '../../../app.constants';
import { UserDto } from '../../users/dto/user.dto';
import { UsersExpiredService } from '../../users_expired/users-expired.service';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);
  private readonly jwtOptions: SignOptions;
  private readonly jwtKey: string;
  private refreshTokenTtl: number;

  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    private readonly usersExpiredService: UsersExpiredService,
  ) {
    this.jwtOptions = { expiresIn: JWT_ACCESS_TOKEN_TTL };
    this.jwtKey = JWT_SECRET;
    this.refreshTokenTtl = JWT_REFRESH_TOKEN_TTL;
  }

  async getAccessTokenFromRefreshToken(
    refreshToken: string,
    oldAccessToken: string,
  ): Promise<any> {
    try {
      const token = await this.refreshTokenRepository.findOne({
        value: refreshToken,
      });
      const currentDate = new Date();
      if (!token) {
        throw new NotFoundException('Refresh token not found');
      }
      if (token.expires_at < currentDate) {
        throw new Error('Refresh token expired');
      }
      const oldPayload = await this.validateToken(oldAccessToken, true);

      if (+token.user_id !== +oldPayload.sub) {
        throw new Error('Token pair error');
      }
      const payload = {
        sub: oldPayload.sub,
      };
      const accessToken = await this.createAccessToken(payload);
      await this.refreshTokenRepository.delete(token.id);
      accessToken.refreshToken = await this.createRefreshToken({
        userId: +oldPayload.sub,
      });

      return accessToken;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error.message);
    }
  }

  async createAccessToken(
    payload: JwtPayload,
    expires = JWT_ACCESS_TOKEN_TTL,
  ): Promise<any> {
    const options = this.jwtOptions;
    if (expires > 0) {
      options.expiresIn = expires;
    } else {
      delete options.expiresIn;
    }
    options.jwtid = uuidv1(options);
    const signedPayload = sign(payload, this.jwtKey, options);
    return {
      accessToken: signedPayload,
      expiresIn: expires,
    };
  }

  async createRefreshToken(tokenContent: { userId: number }): Promise<string> {
    const { userId } = tokenContent;
    const token = new RefreshTokenEntity();
    const refreshToken = randomBytes(64).toString('hex');
    token.user_id = userId;
    token.value = refreshToken;
    token.expires_at = moment().add(this.refreshTokenTtl, 'd').toDate();
    await this.refreshTokenRepository.save(token);
    return refreshToken;
  }

  async validateToken(
    token: string,
    ignoreExpiration: boolean,
  ): Promise<JwtPayload> {
    ignoreExpiration = ignoreExpiration === true ? ignoreExpiration : false;
    try {
      return verify(token, JWT_SECRET, {
        ignoreExpiration,
      }) as JwtPayload;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteRefreshTokenForUser(user: UserDto) {
    await this.refreshTokenRepository.delete({ user_id: user.id });
    await this.revokeTokenForUser(user);
  }

  private async revokeTokenForUser(user: UserDto): Promise<any> {
    return this.usersExpiredService.updateUserExpired(
      user,
      moment().add(JWT_ACCESS_TOKEN_TTL, 's').toDate(),
    );
  }

  async deleteRefreshToken(user: UserDto, value: string) {
    const refresh_token = await this.refreshTokenRepository.findOne({ value });
    if (!refresh_token) {
      throw new Error('Refresh token not found');
    }
    await this.refreshTokenRepository.delete({ value });
    await this.revokeTokenForUser(user);
  }

  async validatePayload(payload: JwtPayload): Promise<any> {
    const tokenBlacklisted = await this.isBlackListed(
      +payload.sub,
      payload.exp,
    );
    if (!tokenBlacklisted) {
      return {
        id: payload.sub,
      };
    }
    return null;
  }

  private async isBlackListed(id: number, expire: number): Promise<boolean> {
    const userExpiredArray = await this.usersExpiredService.findByUserId(id);
    return (
      userExpiredArray && expire < moment(userExpiredArray.expired_at).unix()
    );
  }
}
