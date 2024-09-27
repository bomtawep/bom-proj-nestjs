import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1727337936302 implements MigrationInterface {
  name = 'Migration1727337936302';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "BOM"."BRAND" (
                "CREATED_AT" TIMESTAMP NOT NULL DEFAULT now(),
                "UPDATED_AT" TIMESTAMP NOT NULL DEFAULT now(),
                "DELETED_AT" TIMESTAMP,
                "ID" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "NAME" character varying NOT NULL,
                CONSTRAINT "PK_696b35a337338c9004873a989f0" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ADD "COST" integer NOT NULL DEFAULT 0
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT" DROP COLUMN "COST"
        `);
    await queryRunner.query(`
            DROP TABLE "BOM"."BRAND"
        `);
  }
}
