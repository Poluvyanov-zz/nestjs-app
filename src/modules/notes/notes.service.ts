import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotesEntity } from './models/notes.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesEntity)
    private readonly noteRepository: Repository<NotesEntity>,
  ) {}

  public async create(noteData, user) {
    noteData.user = user;
    const createNote = await this.noteRepository.create(noteData);
    return this.noteRepository.save(createNote);
  }

  public async delete(deleteNoteData, user) {
    const { id } = deleteNoteData;
    return this.noteRepository.delete({
      id,
      user,
    });
  }

  public async getByUserId(user_id: number) {
    return this.noteRepository.find({
      where: {
        user: {
          id: user_id,
        },
      },
      relations: ['user'],
    });
  }

  public async getById(id: number) {
    return this.noteRepository.findOne(id);
  }
}
