import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UserDto {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field(() => String, { nullable: true })
  email: string;
}
