import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ArgsType()
export class LogoutInput {
  @Field((type) => String, { nullable: false })
  refresh_token: string;
}
