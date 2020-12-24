import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetUserArgs {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  email: string;
}
