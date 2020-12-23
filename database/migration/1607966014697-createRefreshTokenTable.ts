import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRefreshTokenTable1607966014697
    implements MigrationInterface {
    name = 'createRefreshTokenTable1607966014697';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "refresh_token" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "value" character varying NOT NULL, "expires_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "refresh_token"`);
    }
}
