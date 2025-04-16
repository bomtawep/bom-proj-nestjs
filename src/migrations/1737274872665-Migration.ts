import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1737274872665 implements MigrationInterface {
    name = 'Migration1737274872665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "BOM"."USERS"
            ADD "CREATED_BY" character varying NOT NULL DEFAULT 'SYSTEM'
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."USERS"
            ADD "UPDATED_BY" character varying NOT NULL DEFAULT 'SYSTEM'
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."USERS"
            ADD "DELETED_BY" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."LOGGER"
            ADD "CREATED_BY" character varying NOT NULL DEFAULT 'SYSTEM'
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."LOGGER"
            ADD "UPDATED_BY" character varying NOT NULL DEFAULT 'SYSTEM'
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."LOGGER"
            ADD "DELETED_BY" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."FILES"
            ADD "CREATED_BY" character varying NOT NULL DEFAULT 'SYSTEM'
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."FILES"
            ADD "UPDATED_BY" character varying NOT NULL DEFAULT 'SYSTEM'
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."FILES"
            ADD "DELETED_BY" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ADD "CREATED_BY" character varying NOT NULL DEFAULT 'SYSTEM'
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ADD "UPDATED_BY" character varying NOT NULL DEFAULT 'SYSTEM'
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ADD "DELETED_BY" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT_TYPE"
            ADD "CREATED_BY" character varying NOT NULL DEFAULT 'SYSTEM'
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT_TYPE"
            ADD "UPDATED_BY" character varying NOT NULL DEFAULT 'SYSTEM'
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT_TYPE"
            ADD "DELETED_BY" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."BRAND"
            ADD "CREATED_BY" character varying NOT NULL DEFAULT 'SYSTEM'
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."BRAND"
            ADD "UPDATED_BY" character varying NOT NULL DEFAULT 'SYSTEM'
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."BRAND"
            ADD "DELETED_BY" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ALTER COLUMN "BRAND_ID" DROP DEFAULT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ALTER COLUMN "BRAND_ID"
            SET DEFAULT ''
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."BRAND" DROP COLUMN "DELETED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."BRAND" DROP COLUMN "UPDATED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."BRAND" DROP COLUMN "CREATED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT_TYPE" DROP COLUMN "DELETED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT_TYPE" DROP COLUMN "UPDATED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT_TYPE" DROP COLUMN "CREATED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT" DROP COLUMN "DELETED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT" DROP COLUMN "UPDATED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT" DROP COLUMN "CREATED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."FILES" DROP COLUMN "DELETED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."FILES" DROP COLUMN "UPDATED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."FILES" DROP COLUMN "CREATED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."LOGGER" DROP COLUMN "DELETED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."LOGGER" DROP COLUMN "UPDATED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."LOGGER" DROP COLUMN "CREATED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."USERS" DROP COLUMN "DELETED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."USERS" DROP COLUMN "UPDATED_BY"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."USERS" DROP COLUMN "CREATED_BY"
        `);
    }

}
