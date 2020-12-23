import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { CurrentUser } from '../../common/decorators/current.user.decorator';
import { LoginOutput } from './dto/login.output';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RegistrationInput } from './dto/registration.input';
import { RegistrationOutput } from './dto/registration.output';
import { UpdateAccessTokenInput } from './dto/update-access-token.input';
import { TokenService } from './token/token.service';
import { UpdateAccessTokenOutput } from './dto/update-access-token.output';
import { LogoutInput } from './dto/logout.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Mutation(() => LoginOutput)
  async login(@Args() loginInput: LoginInput): Promise<LoginOutput> {
    const { email, password } = loginInput;
    return this.authService.login(email, password);
  }

  @Mutation(() => RegistrationOutput)
  async registration(@Args() registrationInput: RegistrationInput) {
    return this.authService.registration(registrationInput);
  }

  @Query(() => UpdateAccessTokenOutput)
  async updateAccessToken(
    @CurrentUser() user,
    @Args() updateAccessTokenInput: UpdateAccessTokenInput,
  ) {
    let response;
    const { refresh_token, old_access_token } = updateAccessTokenInput;
    try {
      response = await this.tokenService.getAccessTokenFromRefreshToken(
        refresh_token,
        old_access_token,
      );
    } catch (error) {
      throw new Error(error.message);
    }
    return response;
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async logout(
    @CurrentUser() user,
    @Args() logoutInput: LogoutInput,
  ): Promise<any> {
    const { refresh_token, from_all } = logoutInput;
    if (from_all) {
      await this.authService.logoutFromAll(user.id);
    } else {
      if (!refresh_token) {
        throw new Error('No refresh token provided');
      }
      await this.authService.logout(user, refresh_token);
    }
    return 'ok';
  }
}
