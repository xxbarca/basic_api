import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1743151263338 implements MigrationInterface {
    name = 'Init1743151263338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu\` ADD \`tags\` varchar(255) NULL COMMENT 'TAG'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu\` DROP COLUMN \`tags\``);
    }

}
