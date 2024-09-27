import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1726053727594 implements MigrationInterface {
  name = 'Migration1726053727594';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "BOM"."LOGGER" (
                "CREATED_AT" TIMESTAMP NOT NULL DEFAULT now(),
                "UPDATED_AT" TIMESTAMP NOT NULL DEFAULT now(),
                "DELETED_AT" TIMESTAMP,
                "ID" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "STATUS_CODE" character varying NOT NULL,
                "MESSAGE" character varying NOT NULL,
                "TIMESTAMP" TIMESTAMP NOT NULL,
                "PATH" character varying NOT NULL,
                CONSTRAINT "PK_1d922dc9eabeee049a28c7d8043" PRIMARY KEY ("ID")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "BOM"."LOGGER"
        `);
  }
}
