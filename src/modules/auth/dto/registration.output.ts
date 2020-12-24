import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegistrationOutput {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field(() => String, { nullable: false })
  email: string;

  @Field({ nullable: false })
  created_at: Date;
}
