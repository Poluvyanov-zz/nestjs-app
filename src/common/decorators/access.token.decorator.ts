import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExtractJwt } from 'passport-jwt';

export const AccessToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(
      ctx.getContext().req,
    );
    return accessToken;
  },
);
