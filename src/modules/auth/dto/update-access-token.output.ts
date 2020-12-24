import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateAccessTokenOutput {
  @Field(() => String, { nullable: false })
  accessToken: string;

  @Field(() => String, { nullable: false })
  refreshToken: string;

  @Field(() => String, { nullable: false })
  expiresIn: number;
}
