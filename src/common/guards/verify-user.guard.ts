import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class VerifyUserGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (req.user && !req.user.email_verified) {
      throw new Error('Email not confirmed');
    }
    return true;
  }
}
