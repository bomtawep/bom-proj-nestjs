import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1726220822124 implements MigrationInterface {
    name = 'Migration1726220822124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "BOM"."USERS"
            ADD "ROLES" character varying NOT NULL DEFAULT 'USER'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "BOM"."USERS" DROP COLUMN "ROLES"
        `);
    }

}
