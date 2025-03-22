import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742610123393 implements MigrationInterface {
    name = 'Init1742610123393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu\` CHANGE \`subtitle\` \`subtitle\` varchar(800) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu\` CHANGE \`subtitle\` \`subtitle\` varchar(800) NOT NULL`);
    }

}
