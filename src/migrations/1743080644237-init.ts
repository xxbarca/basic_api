import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1743080644237 implements MigrationInterface {
    name = 'Init1743080644237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu\` CHANGE \`root_category_id\` \`root_category_id\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu\` CHANGE \`root_category_id\` \`root_category_id\` varchar(255) NOT NULL`);
    }

}
