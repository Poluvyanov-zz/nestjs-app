import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LogoutInput {
  @Field(() => String, { nullable: false })
  refresh_token: string;
}
