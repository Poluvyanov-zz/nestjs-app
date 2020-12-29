import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { NotesEntity } from '../../notes/models/notes.entity';

@ObjectType('User')
@InputType()
@Entity('users')
export class UserEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, unique: true })
  email: string;

  @Field(() => String)
  @Column({ nullable: false, unique: false })
  email_token: string;

  @Field(() => Boolean)
  @Column()
  email_verified: boolean;

  @Field(() => String)
  @Column()
  password: string;

  @Field()
  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Field()
  @Column('timestamp', { nullable: true })
  updated_at: Date;

  @Field()
  @Column('timestamp', { nullable: true })
  deleted_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashSync(this.password, 10);
  }

  @OneToMany(() => NotesEntity, (note) => note.user)
  notes?: NotesEntity[];

  async comparePassword(attempt: string): Promise<boolean> {
    return compareSync(attempt, this.password);
  }
}
