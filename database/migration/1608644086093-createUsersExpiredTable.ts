import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersExpiredTable1608644086093
  implements MigrationInterface {
  name = 'createUsersExpiredTable1608644086093';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_expired" ("id" SERIAL NOT NULL, "expired_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP, "user_id" integer, CONSTRAINT "REL_1c9376d54dd13aa3fec7195ca7" UNIQUE ("user_id"), CONSTRAINT "PK_a7f05f29b9b1a08361345e558e7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_expired" ADD CONSTRAINT "FK_1c9376d54dd13aa3fec7195ca70" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_expired" DROP CONSTRAINT "FK_1c9376d54dd13aa3fec7195ca70"`,
    );
    await queryRunner.query(`DROP TABLE "user_expired"`);
  }
}
