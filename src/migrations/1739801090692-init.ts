import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1739801090692 implements MigrationInterface {
    name = 'Init1739801090692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu\` ADD \`parent_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`type\` \`type\` enum ('0', '1', '2') NOT NULL COMMENT '组件类型' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`FK_e5e28130fd17f88ab5ee5d3aa4c\` FOREIGN KEY (\`parent_id\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`FK_e5e28130fd17f88ab5ee5d3aa4c\``);
        await queryRunner.query(`ALTER TABLE \`menu\` CHANGE \`type\` \`type\` enum ('1', '2', '3') NOT NULL COMMENT '组件类型' DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`parent_id\``);
    }

}
