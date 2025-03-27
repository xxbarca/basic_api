import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1743131928287 implements MigrationInterface {
    name = 'Init1743131928287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sku\` ADD \`specs\` json NOT NULL COMMENT 'spec'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sku\` DROP COLUMN \`specs\``);
    }

}
