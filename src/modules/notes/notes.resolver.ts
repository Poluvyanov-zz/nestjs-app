import { UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateNoteInput } from './dto/create.note.input';
import { CurrentUser } from '../../common/decorators/current.user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { NotesEntity } from './models/notes.entity';
import { VerifyUserGuard } from '../../common/guards/verify-user.guard';
import { DeleteNoteInput } from './dto/delete.note.input';

@Resolver()
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard, VerifyUserGuard)
  @Mutation(() => NotesEntity)
  async createNote(
    @Args() noteInput: CreateNoteInput,
    @CurrentUser() currenUser,
  ) {
    return this.notesService.create(noteInput, currenUser);
  }

  @UseGuards(JwtAuthGuard, VerifyUserGuard)
  @Mutation(() => NotesEntity)
  async deleteNote(
    @Args() deleteNoteInput: DeleteNoteInput,
    @CurrentUser() currenUser,
  ) {
    return this.notesService.delete(deleteNoteInput, currenUser);
  }

  @Query(() => [NotesEntity])
  public async notesByUserId(@Args('user_id') user_id: number) {
    return this.notesService.getByUserId(user_id);
  }

  @Query(() => NotesEntity)
  public async noteById(@Args('id') id: number) {
    return this.notesService.getById(id);
  }
}
