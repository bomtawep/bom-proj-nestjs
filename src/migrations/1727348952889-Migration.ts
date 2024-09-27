import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1727348952889 implements MigrationInterface {
  name = 'Migration1727348952889';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT" DROP COLUMN "BRAND"
        `);
    await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ADD "BRAND_ID" character varying NOT NULL DEFAULT ''
        `);
    await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ALTER COLUMN "COST" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ALTER COLUMN "IMAGE_ID"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ALTER COLUMN "PRODUCT_TYPE_ID"
            SET NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ALTER COLUMN "PRODUCT_TYPE_ID" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ALTER COLUMN "IMAGE_ID" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ALTER COLUMN "COST"
            SET DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT" DROP COLUMN "BRAND_ID"
        `);
    await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ADD "BRAND" character varying NOT NULL
        `);
  }
}
