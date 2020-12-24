import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, unique: true })
  email: string;

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

  async comparePassword(attempt: string): Promise<boolean> {
    return compareSync(attempt, this.password);
  }
}
