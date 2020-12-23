import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetUserArgs {
  @Field((type) => String, { nullable: false })
  id: string;

  @Field((type) => String, { nullable: false })
  email: string;
}
