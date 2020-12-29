import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetNotesArgs {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  email: string;
}
