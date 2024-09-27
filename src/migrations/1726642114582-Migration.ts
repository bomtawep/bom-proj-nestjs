import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1726642114582 implements MigrationInterface {
  name = 'Migration1726642114582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "BOM"."LOGGER"
            ADD "STACK" character varying NOT NULL DEFAULT ''
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "BOM"."LOGGER" DROP COLUMN "STACK"
        `);
  }
}
