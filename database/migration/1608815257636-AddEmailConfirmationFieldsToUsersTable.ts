import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailConfirmationFieldsToUsersTable1608815257636
  implements MigrationInterface {
  name = 'AddEmailConfirmationFieldsToUsersTable1608815257636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ADD COLUMN email_token character varying, ADD COLUMN email_verified BOOLEAN DEFAULT FALSE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users DROP COLUMN IF EXISTS email_token, DROP COLUMN IF EXISTS email_verified`,
    );
  }
}
