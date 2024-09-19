import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726635801011 implements MigrationInterface {
    name = 'Migration1726635801011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "BOM"."FILES" (
                "CREATED_AT" TIMESTAMP NOT NULL DEFAULT now(),
                "UPDATED_AT" TIMESTAMP NOT NULL DEFAULT now(),
                "DELETED_AT" TIMESTAMP,
                "ID" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "ORIGINAL_NAME" character varying NOT NULL,
                "ENCODING" character varying NOT NULL,
                "MIMETYPE" character varying NOT NULL,
                "DESTINATION" character varying NOT NULL,
                "FILENAME" character varying NOT NULL,
                "PATH" character varying NOT NULL,
                "SIZE" character varying NOT NULL,
                CONSTRAINT "PK_2bdc82cfc7f635461aecabbded8" PRIMARY KEY ("ID")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "BOM"."FILES"
        `);
    }

}
