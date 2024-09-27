import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1727020001712 implements MigrationInterface {
    name = 'Migration1727020001712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "BOM"."PRODUCT" (
                "CREATED_AT" TIMESTAMP NOT NULL DEFAULT now(),
                "UPDATED_AT" TIMESTAMP NOT NULL DEFAULT now(),
                "DELETED_AT" TIMESTAMP,
                "ID" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "NAME" character varying NOT NULL,
                "PRICE" integer NOT NULL,
                "STOCK" integer NOT NULL,
                "DESCRIPTION" character varying,
                "CATEGORY" character varying NOT NULL,
                "BRAND" character varying NOT NULL,
                "STATUS" character varying NOT NULL,
                "WEIGHT" integer,
                "LENGTH" integer,
                "WIDTH" integer,
                "HEIGHT" integer,
                "DISCOUNT" integer,
                "DISCOUNT_TYPE" character varying,
                "DISCOUNT_VALUE" integer,
                "DISCOUNT_START" TIMESTAMP,
                "DISCOUNT_END" TIMESTAMP,
                "IMAGE_ID" character varying,
                "PRODUCT_TYPE_ID" character varying,
                CONSTRAINT "PK_139d268cb314905821f3cb96fd4" PRIMARY KEY ("ID")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "BOM"."PRODUCT_TYPE" (
                "CREATED_AT" TIMESTAMP NOT NULL DEFAULT now(),
                "UPDATED_AT" TIMESTAMP NOT NULL DEFAULT now(),
                "DELETED_AT" TIMESTAMP,
                "ID" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "NAME" character varying NOT NULL,
                CONSTRAINT "PK_c403e7bbf45ab85adff89b931df" PRIMARY KEY ("ID")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "BOM"."PRODUCT_TYPE"
        `);
        await queryRunner.query(`
            DROP TABLE "BOM"."PRODUCT"
        `);
    }

}
