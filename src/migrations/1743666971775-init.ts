import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1743666971775 implements MigrationInterface {
    name = 'Init1743666971775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`spu\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`title\` varchar(100) NOT NULL, \`subtitle\` varchar(800) NULL, \`category_id\` varchar(255) NOT NULL, \`root_category_id\` varchar(255) NULL, \`online\` enum ('0', '1') NOT NULL COMMENT '是否上线' DEFAULT '1', \`price\` varchar(20) NOT NULL COMMENT '价格', \`sketch_spec_id\` varchar(255) NULL COMMENT '某种规格可以直接附加单品图片', \`default_sku_id\` varchar(255) NULL COMMENT '默认选中的SKU', \`img\` varchar(255) NULL COMMENT '图片', \`discount_price\` varchar(20) NULL COMMENT '价格', \`description\` text NULL COMMENT '描述', \`tags\` varchar(255) NULL COMMENT 'TAG', UNIQUE INDEX \`IDX_4b4a83a7df70c58102259c250f\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`spec_value\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`value\` varchar(255) NOT NULL COMMENT '规格值', \`spec_key_id\` varchar(255) NOT NULL COMMENT '规格名ID', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sku\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`spu_id\` varchar(64) NOT NULL COMMENT 'SPU id', \`title\` varchar(100) NOT NULL, \`price\` varchar(20) NOT NULL COMMENT '价格', \`discount_price\` varchar(20) NULL COMMENT '价格', \`online\` enum ('0', '1') NOT NULL COMMENT '是否上线' DEFAULT '1', \`img\` varchar(255) NULL COMMENT '图片', \`code\` varchar(255) NOT NULL COMMENT '编码 格式: spu_id$spec_key_id-spec_value_id#spec_key_id-spec_value_id', \`category_id\` varchar(255) NOT NULL COMMENT '分类', \`stock\` int NOT NULL COMMENT '库存', \`specs\` json NOT NULL COMMENT 'spec', UNIQUE INDEX \`IDX_10e129f02b3e39cf52f8d262b2\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`level\` int NOT NULL DEFAULT '1', \`online\` enum ('0', '1') NOT NULL COMMENT '是否上线' DEFAULT '1', \`index\` int NOT NULL COMMENT '排序' DEFAULT '0', \`img\` varchar(255) NULL COMMENT '图片', \`name\` varchar(255) NOT NULL COMMENT '名称', \`description\` text NULL COMMENT '描述', \`parent_id\` varchar(255) NULL COMMENT '父分类id', UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`banner\` (\`id\` int NOT NULL AUTO_INCREMENT, \`img\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL COMMENT '用户名', \`password\` varchar(255) NOT NULL COMMENT '密码', \`nickname\` varchar(255) NOT NULL COMMENT '昵称', \`email\` varchar(255) NULL COMMENT '邮箱', \`phone\` varchar(255) NULL COMMENT '手机', \`avatar\` varchar(255) NULL COMMENT '头像', \`description\` varchar(255) NULL COMMENT '描述', \`created_at\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accessToken\` varchar(255) NULL, \`refreshToken\` varchar(255) NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menu\` (\`id\` varchar(36) NOT NULL, \`component\` varchar(255) NULL COMMENT '组件', \`value\` varchar(255) NULL COMMENT '权限值, 一般针对按钮', \`icon\` varchar(255) NULL COMMENT 'icon', \`name\` varchar(255) NOT NULL COMMENT '名称', \`orderNo\` int NOT NULL COMMENT '排序' DEFAULT '1', \`path\` varchar(255) NULL COMMENT '路径', \`status\` enum ('1', '0') NOT NULL COMMENT '是否禁用' DEFAULT '1', \`type\` enum ('0', '1', '2') NOT NULL COMMENT '组件类型' DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`parent_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_7df575a48dedaea3e65cb6d05a\` (\`value\`), UNIQUE INDEX \`IDX_51b63874cdce0d6898a0b2150f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`spec_key\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(100) NOT NULL, \`unit\` varchar(30) NULL, UNIQUE INDEX \`IDX_0fd84a16b1a7804a523bd329ff\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`FK_e5e28130fd17f88ab5ee5d3aa4c\` FOREIGN KEY (\`parent_id\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`FK_e5e28130fd17f88ab5ee5d3aa4c\``);
        await queryRunner.query(`DROP INDEX \`IDX_0fd84a16b1a7804a523bd329ff\` ON \`spec_key\``);
        await queryRunner.query(`DROP TABLE \`spec_key\``);
        await queryRunner.query(`DROP INDEX \`IDX_51b63874cdce0d6898a0b2150f\` ON \`menu\``);
        await queryRunner.query(`DROP INDEX \`IDX_7df575a48dedaea3e65cb6d05a\` ON \`menu\``);
        await queryRunner.query(`DROP TABLE \`menu\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`banner\``);
        await queryRunner.query(`DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP INDEX \`IDX_10e129f02b3e39cf52f8d262b2\` ON \`sku\``);
        await queryRunner.query(`DROP TABLE \`sku\``);
        await queryRunner.query(`DROP TABLE \`spec_value\``);
        await queryRunner.query(`DROP INDEX \`IDX_4b4a83a7df70c58102259c250f\` ON \`spu\``);
        await queryRunner.query(`DROP TABLE \`spu\``);
    }

}
