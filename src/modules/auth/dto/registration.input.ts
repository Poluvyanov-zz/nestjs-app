import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ArgsType()
export class RegistrationInput {
  @Field((type) => String, { nullable: false })
  @IsEmail()
  email: string;

  @Field((type) => String, { nullable: false })
  password: string;
}
