import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1739799574700 implements MigrationInterface {
    name = 'Init1739799574700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`menu\` (\`id\` varchar(36) NOT NULL, \`component\` varchar(255) NULL COMMENT '组件', \`value\` varchar(255) NULL COMMENT '权限值, 一般针对按钮', \`icon\` varchar(255) NULL COMMENT 'icon', \`name\` varchar(255) NOT NULL COMMENT '名称', \`orderNo\` int NOT NULL COMMENT '排序' DEFAULT '1', \`path\` varchar(255) NULL COMMENT '路径', \`status\` enum ('1', '0') NOT NULL COMMENT '是否禁用' DEFAULT '1', \`type\` enum ('1', '2', '3') NOT NULL COMMENT '组件类型' DEFAULT '1', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_7df575a48dedaea3e65cb6d05a\` (\`value\`), UNIQUE INDEX \`IDX_51b63874cdce0d6898a0b2150f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_51b63874cdce0d6898a0b2150f\` ON \`menu\``);
        await queryRunner.query(`DROP INDEX \`IDX_7df575a48dedaea3e65cb6d05a\` ON \`menu\``);
        await queryRunner.query(`DROP TABLE \`menu\``);
    }

}
