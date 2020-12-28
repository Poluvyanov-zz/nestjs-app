import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegistrationOutput {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  email_token: string;

  @Field(() => String, { nullable: false })
  email_verified: boolean;

  @Field({ nullable: false })
  created_at: Date;
}
