import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726049898959 implements MigrationInterface {
    name = 'Migration1726049898959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE SCHEMA "BOM"
            CREATE TABLE "BOM"."USERS" (
                "CREATED_AT" TIMESTAMP NOT NULL DEFAULT now(),
                "UPDATED_AT" TIMESTAMP NOT NULL DEFAULT now(),
                "DELETED_AT" TIMESTAMP,
                "ID" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "USERNAME" character varying NOT NULL,
                "PASSWORD" character varying NOT NULL,
                "FIRSTNAME" character varying NOT NULL,
                "LASTNAME" character varying NOT NULL,
                "NICKNAME" character varying,
                "GENDER" character varying NOT NULL,
                "PHONE_NUMBER" character varying,
                "EMAIL" character varying NOT NULL,
                "ADDRESS" character varying,
                "STATUS" character varying NOT NULL,
                CONSTRAINT "PK_475d4b511309ada89807bc2d40b" PRIMARY KEY ("ID")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE SCHEMA "BOM"
            DROP TABLE "BOM"."USERS"
        `);
    }

}
