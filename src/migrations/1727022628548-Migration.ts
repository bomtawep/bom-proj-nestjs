import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1727022628548 implements MigrationInterface {
    name = 'Migration1727022628548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT" DROP COLUMN "CATEGORY"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "BOM"."PRODUCT"
            ADD "CATEGORY" character varying NOT NULL
        `);
    }

}
