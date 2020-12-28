import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token/token.service';
import { UsersService } from '../users/users.service';
import { RegistrationInput } from './dto/registration.input';
import { UserEntity } from '../users/models/user.entity';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly userService: UsersService) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user: UserEntity = await this.userService.findByEmail(email);
      if (await user.comparePassword(password)) {
        return user;
      }
      return null;
    } catch (e) {
      Logger.log(e);
      throw new Error(e.message);
    }
  }

  async login(email, password) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new Error('User not found');
    }
    const payload = { sub: user.id };

    const loginResponse = await this.tokenService.createAccessToken(payload);

    const tokenContent = {
      userId: user.id,
    };

    loginResponse.refreshToken = await this.tokenService.createRefreshToken(
      tokenContent,
    );

    return loginResponse;
  }

  async registration(registrationInput: RegistrationInput) {
    const { email } = registrationInput;
    if (await this.userService.findByEmail(email)) {
      throw new Error('User already exist');
    }
    const email_token = this.generateEmailToken();

    return this.userService.create(registrationInput, email_token);
  }

  async logout(user: UserDto, refreshToken: string): Promise<string> {
    try {
      await this.tokenService.deleteRefreshToken(user, refreshToken);
    } catch (e) {
      throw new Error(e.message);
    }
    return 'ok';
  }

  async verifyEmail(token: string) {
    const user = await this.userService.findByEmailToken(token);
    if (user && !user.email_verified) {
      await this.userService.update(user.id, {
        email_verified: true,
      });
      return true;
    }
    return false;
  }

  generateEmailToken() {
    return (Math.floor(Math.random() * 9000000) + 1000000).toString();
  }
}
