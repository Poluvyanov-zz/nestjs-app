import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
