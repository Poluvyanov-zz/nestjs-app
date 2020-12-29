import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '../../users/models/user.entity';

export class CreateNoteArgs {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  public readonly user: UserEntity;
}
