import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742552404460 implements MigrationInterface {
    name = 'Init1742552404460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`level\` int NOT NULL DEFAULT '1', \`online\` enum ('0', '1') NOT NULL COMMENT '是否上线' DEFAULT '0', \`index\` int NOT NULL COMMENT '排序' DEFAULT '0', \`img\` varchar(255) NULL COMMENT '图片', \`name\` varchar(255) NOT NULL COMMENT '名称', \`description\` text NULL COMMENT '描述', \`parent_id\` varchar(255) NULL COMMENT '父分类id', \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL COMMENT '用户名', \`password\` varchar(255) NOT NULL COMMENT '密码', \`nickname\` varchar(255) NOT NULL COMMENT '昵称', \`email\` varchar(255) NULL COMMENT '邮箱', \`phone\` varchar(255) NULL COMMENT '手机', \`avatar\` varchar(255) NULL COMMENT '头像', \`description\` varchar(255) NULL COMMENT '描述', \`created_at\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accessToken\` varchar(255) NULL, \`refreshToken\` varchar(255) NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menu\` (\`id\` varchar(36) NOT NULL, \`component\` varchar(255) NULL COMMENT '组件', \`value\` varchar(255) NULL COMMENT '权限值, 一般针对按钮', \`icon\` varchar(255) NULL COMMENT 'icon', \`name\` varchar(255) NOT NULL COMMENT '名称', \`orderNo\` int NOT NULL COMMENT '排序' DEFAULT '1', \`path\` varchar(255) NULL COMMENT '路径', \`status\` enum ('1', '0') NOT NULL COMMENT '是否禁用' DEFAULT '1', \`type\` enum ('0', '1', '2') NOT NULL COMMENT '组件类型' DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`parent_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_7df575a48dedaea3e65cb6d05a\` (\`value\`), UNIQUE INDEX \`IDX_51b63874cdce0d6898a0b2150f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`banner\` (\`id\` int NOT NULL AUTO_INCREMENT, \`img\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`FK_e5e28130fd17f88ab5ee5d3aa4c\` FOREIGN KEY (\`parent_id\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`FK_e5e28130fd17f88ab5ee5d3aa4c\``);
        await queryRunner.query(`DROP TABLE \`banner\``);
        await queryRunner.query(`DROP INDEX \`IDX_51b63874cdce0d6898a0b2150f\` ON \`menu\``);
        await queryRunner.query(`DROP INDEX \`IDX_7df575a48dedaea3e65cb6d05a\` ON \`menu\``);
        await queryRunner.query(`DROP TABLE \`menu\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
