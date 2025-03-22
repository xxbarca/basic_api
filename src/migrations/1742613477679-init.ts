import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742613477679 implements MigrationInterface {
    name = 'Init1742613477679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu\` CHANGE \`price\` \`price\` varchar(20) NOT NULL COMMENT '价格'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu\` CHANGE \`price\` \`price\` varchar(20) NULL COMMENT '价格'`);
    }

}
