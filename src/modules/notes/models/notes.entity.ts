import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../../users/models/user.entity';

@ObjectType('Note')
@Entity('notes')
export class NotesEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => UserEntity, { nullable: false })
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;

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
}
