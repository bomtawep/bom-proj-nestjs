import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726643427305 implements MigrationInterface {
    name = 'Migration1726643427305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "BOM"."LOGGER"
            ALTER COLUMN "STACK" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."FILES" DROP COLUMN "SIZE"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."FILES"
            ADD "SIZE" integer NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "BOM"."FILES" DROP COLUMN "SIZE"
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."FILES"
            ADD "SIZE" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "BOM"."LOGGER"
            ALTER COLUMN "STACK"
            SET DEFAULT ''
        `);
    }

}
