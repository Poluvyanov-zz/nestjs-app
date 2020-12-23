import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ArgsType()
export class UpdateAccessTokenInput {
  @Field((type) => String, { nullable: false })
  refresh_token: string;

  @Field((type) => String, { nullable: false })
  old_access_token: string;
}
