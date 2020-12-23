import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegistrationOutput {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field((type) => String, { nullable: false })
  email: string;

  @Field({ nullable: false })
  created_at: Date;
}
