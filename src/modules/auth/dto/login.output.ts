import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class LoginOutput {
  @Field((type) => String, { nullable: false })
  accessToken: string;

  @Field((type) => Int, { nullable: false })
  expiresIn: number;

  @Field((type) => String, { nullable: false })
  refreshToken: string;
}
