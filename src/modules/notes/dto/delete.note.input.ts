import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteNoteInput {
  @Field(() => Int, { nullable: false })
  readonly id: number;
}
