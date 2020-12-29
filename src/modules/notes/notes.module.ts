import { HttpModule, Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesEntity } from './models/notes.entity';
import { NotesResolver } from './notes.resolver';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([NotesEntity])],
  providers: [NotesService, NotesResolver],
  exports: [NotesService],
})
export class NotesModule {}
