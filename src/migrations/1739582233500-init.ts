import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1739582233500 implements MigrationInterface {
    name = 'Init1739582233500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL COMMENT '用户名', \`password\` varchar(255) NOT NULL COMMENT '密码', \`nickname\` varchar(255) NOT NULL COMMENT '昵称', \`email\` varchar(255) NULL COMMENT '邮箱', \`phone\` varchar(255) NULL COMMENT '手机', \`avatar\` varchar(255) NULL COMMENT '头像', \`description\` varchar(255) NULL COMMENT '描述', \`created_at\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accessToken\` varchar(255) NULL, \`refreshToken\` varchar(255) NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
