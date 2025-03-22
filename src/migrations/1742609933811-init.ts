import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742609933811 implements MigrationInterface {
    name = 'Init1742609933811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`spu\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`title\` varchar(100) NOT NULL, \`subtitle\` varchar(800) NOT NULL, \`category_id\` int NOT NULL, \`root_category_id\` int NOT NULL, \`online\` enum ('0', '1') NOT NULL COMMENT '是否上线' DEFAULT '1', \`price\` varchar(20) NULL COMMENT '价格', \`sketch_spec_id\` varchar(255) NULL COMMENT '某种规格可以直接附加单品图片', \`default_sku_id\` varchar(255) NULL COMMENT '默认选中的SKU', \`img\` varchar(255) NULL COMMENT '图片', \`discount_price\` varchar(20) NULL COMMENT '价格', \`description\` text NULL COMMENT '描述', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`online\` \`online\` enum ('0', '1') NOT NULL COMMENT '是否上线' DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`online\` \`online\` enum ('0', '1') NOT NULL COMMENT '是否上线' DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE \`spu\``);
    }

}
