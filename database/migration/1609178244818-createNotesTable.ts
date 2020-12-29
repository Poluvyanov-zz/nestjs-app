import { MigrationInterface, QueryRunner } from 'typeorm';

export class createNotesTable1609178244818 implements MigrationInterface {
  name = 'createNotesTable1609178244818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, "user_id" integer, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "notes" ADD CONSTRAINT "FK_7708dcb62ff332f0eaf9f0743a7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notes" DROP CONSTRAINT "FK_7708dcb62ff332f0eaf9f0743a7"`,
    );
    await queryRunner.query(`DROP TABLE "notes"`);
  }
}
