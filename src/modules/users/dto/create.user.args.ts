import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserArgs {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
