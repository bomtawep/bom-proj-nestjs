import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1726651762858 implements MigrationInterface {
  name = 'Migration1726651762858';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "BOM"."USERS"
            ADD "IMAGE_ID" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "BOM"."USERS" DROP COLUMN "IMAGE_ID"
        `);
  }
}
