import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginOutput {
  @Field(() => String, { nullable: false })
  accessToken: string;

  @Field(() => Int, { nullable: false })
  expiresIn: number;

  @Field(() => String, { nullable: false })
  refreshToken: string;
}
