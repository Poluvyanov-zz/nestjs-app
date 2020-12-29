import { ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { NotesEntity } from '../models/notes.entity';

@ObjectType()
export class CreateNoteOutput {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  public readonly note: NotesEntity;
}
