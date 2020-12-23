import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateAccessTokenOutput {
  @Field((type) => String, { nullable: false })
  accessToken: string;

  @Field((type) => String, { nullable: false })
  refreshToken: string;

  @Field((type) => String, { nullable: false })
  expiresIn: number;
}
