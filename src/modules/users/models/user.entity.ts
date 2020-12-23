import { BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { UserExpiredEntity } from '../../users_expired/models/user_expired.entity';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column({ nullable: false, unique: true })
  email: string;

  @Field((type) => String)
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

  async comparePassword(attempt: string): Promise<boolean> {
    return compareSync(attempt, this.password);
  }
}
