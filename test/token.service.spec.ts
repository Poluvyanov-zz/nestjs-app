import { Test } from '@nestjs/testing';
import { TokenService } from '../src/modules/auth/token/token.service';
import moment from 'moment';
import { getRepositoryToken } from '@nestjs/typeorm';
import RefreshTokenEntity from '../src/modules/auth/models/refresh-token.entity';
import { UsersExpiredService } from '../src/modules/users_expired/users-expired.service';
import { verify } from 'jsonwebtoken';

const oldPayload = {
  sub: 1,
  iat: 1608795807,
  exp: 1608796107,
  jti: 'b5788ef0-45bb-11eb-a97a-af24c0d08079',
};

const refreshToken = {
  id: 1,
  user_id: 1,
  value: 'refreshToken',
  expired_at: moment('2020-01-02 00:00:00').toDate(),
  created_at: moment('2020-01-01 00:00:00').toDate(),
};

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYwODc5NTgwNywiZXhwIjoxNjA4Nzk2MTA3LCJqdGkiOiJiNTc4OGVmMC00NWJiLTExZWItYTk3YS1hZjI0YzBkMDgwNzkifQ.oYViBg8ZGXVNcag0CO58tEc9vVF2QJewUw-gTdPbHMM';

const mockedRefreshTokenRepository = {
  findOne: () => refreshToken,
  delete: () => true,
  save: () => true,
};

const mockedUsersExpiredService = {};

describe('TokenService', () => {
  let tokenService: TokenService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: UsersExpiredService,
          useValue: mockedUsersExpiredService,
        },
        {
          provide: getRepositoryToken(RefreshTokenEntity),
          useValue: mockedRefreshTokenRepository,
        },
      ],
    }).compile();
    tokenService = module.get<TokenService>(TokenService);
  });
  describe('getAccessTokenFromRefreshToken', () => {
    it('should return accessToken', async () => {
      const verifyMock = jest.fn().mockReturnValue(oldPayload);

      tokenService.generateRefreshToken = jest
        .fn()
        .mockReturnValue('refreshToken');

      tokenService.createAccessToken = jest.fn().mockReturnValue({
        accessToken: 'accessToken',
        expiresIn: 300,
      });

      (verify as jest.Mock) = verifyMock;

      const result = {
        accessToken: 'accessToken',
        expiresIn: 300,
        refreshToken: 'refreshToken',
      };

      expect(
        await tokenService.getAccessTokenFromRefreshToken(
          'refreshToken',
          accessToken,
        ),
      ).toStrictEqual(result);
    });
  });
});
