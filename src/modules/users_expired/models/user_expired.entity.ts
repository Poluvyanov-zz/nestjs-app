import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../../users/models/user.entity';

@ObjectType()
@Entity('user_expired')
export class UserExpiredEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => UserEntity, { nullable: false })
  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;

  @Field()
  @Column('timestamp', { nullable: false })
  expired_at: Date;

  @Field()
  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Field()
  @Column('timestamp', { nullable: true })
  updated_at: Date;
}
