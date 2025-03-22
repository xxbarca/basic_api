import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742613353923 implements MigrationInterface {
    name = 'Init1742613353923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`spu\` ADD \`category_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`spu\` DROP COLUMN \`root_category_id\``);
        await queryRunner.query(`ALTER TABLE \`spu\` ADD \`root_category_id\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu\` DROP COLUMN \`root_category_id\``);
        await queryRunner.query(`ALTER TABLE \`spu\` ADD \`root_category_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`spu\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`spu\` ADD \`category_id\` int NOT NULL`);
    }

}
