import { Test } from '@nestjs/testing';
import { AuthService } from '../src/modules/auth/auth.service';
import { LoginOutput } from '../src/modules/auth/dto/login.output';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../src/modules/users/users.service';
import { TokenService } from '../src/modules/auth/token/token.service';
import { RegistrationOutput } from '../src/modules/auth/dto/registration.output';
import moment from 'moment';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserExpiredEntity } from '../src/modules/users_expired/models/user_expired.entity';

const user = {
  id: 1,
  email: 'test@test.com',
  password: '123456',
  created_at: moment('2020-01-01 00:00:00').toDate(),
  comparePassword: () => true,
};

const createdUser = {
  id: 2,
  email: 'test2@test.com',
  created_at: moment('2020-01-01 00:00:00').toDate(),
};

const userExpiredData = {
  id: 1,
  user: user,
  expired_at: moment('2020-01-02 00:00:00').toDate(),
  created_at: moment('2020-01-01 00:00:00').toDate(),
};

const createAccessTokenResponse = {
  accessToken: 'accessToken',
  expiresIn: 300,
};

const refreshTokenResponse = 'refreshToken';

const mockedUsersExpiredRepository = {
  findOne: () => userExpiredData,
  update: () => true,
};

const mockedJwtService = {
  sign: () => '',
};

const mockedUsersService = {
  findByEmail: (email) => (email === 'test@test.com' ? user : null),
  create: () => createdUser,
};

const mockedTokenService = {
  createAccessToken: () => createAccessTokenResponse,
  createRefreshToken: () => refreshTokenResponse,
  deleteRefreshToken: () => true,
};

describe('AuthService', () => {
  let authService: AuthService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockedUsersService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: TokenService,
          useValue: mockedTokenService,
        },
        {
          provide: getRepositoryToken(UserExpiredEntity),
          useValue: mockedUsersExpiredRepository,
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
  });
  describe('registration', () => {
    it('should return user data', async () => {
      const result: RegistrationOutput = {
        id: 2,
        email: 'test2@test.com',
        created_at: moment('2020-01-01 00:00:00').toDate(),
      };

      expect(
        await authService.registration({
          email: 'test2@test.com',
          password: '123456',
        }),
      ).toStrictEqual(result);
    });
  });

  describe('login', () => {
    it('should return auth token', async () => {
      const result: LoginOutput = {
        accessToken: 'accessToken',
        expiresIn: 300,
        refreshToken: 'refreshToken',
      };

      expect(await authService.login('test@test.com', '123456')).toStrictEqual(
        result,
      );
    });
  });

  describe('logout', () => {
    it('should return ok', async () => {
      const result = 'ok';

      expect(await authService.logout(user, '123456')).toStrictEqual(result);
    });
  });
});
