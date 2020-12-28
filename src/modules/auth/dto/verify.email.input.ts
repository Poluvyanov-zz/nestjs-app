import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class VerifyEmailInput {
  @Field(() => String, { nullable: false })
  token: string;
}
