import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('refresh_token')
export default class RefreshTokenEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Int)
  @Column()
  user_id: number;

  @Field((type) => String)
  @Column()
  value: string;

  @Field()
  @Column('timestamp', { nullable: false })
  expires_at: Date;

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
