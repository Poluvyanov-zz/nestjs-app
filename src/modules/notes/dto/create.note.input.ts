import { ArgsType, Field } from '@nestjs/graphql';
@ArgsType()
export class CreateNoteInput {
  @Field(() => String, { nullable: false })
  readonly title: string;

  @Field(() => String, { nullable: false })
  readonly description: string;
}
