import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UpdateAccessTokenInput {
  @Field(() => String, { nullable: false })
  refresh_token: string;

  @Field(() => String, { nullable: false })
  old_access_token: string;
}
