import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UserDto {
  @Field((type) => Int, { nullable: false })
  id: number;

  @Field((type) => String, { nullable: true })
  email: string;
}
