import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1743081815822 implements MigrationInterface {
    name = 'Init1743081815822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sku\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`spu_id\` varchar(64) NOT NULL COMMENT 'SPU id', \`title\` varchar(100) NOT NULL, \`price\` varchar(20) NOT NULL COMMENT '价格', \`discount_price\` varchar(20) NULL COMMENT '价格', \`online\` enum ('0', '1') NOT NULL COMMENT '是否上线' DEFAULT '1', \`img\` varchar(255) NULL COMMENT '图片', \`code\` varchar(255) NOT NULL COMMENT '编码 格式: spu_id$spec_key_id-spec_value_id#spec_key_id-spec_value_id', \`category_id\` varchar(255) NOT NULL COMMENT '分类', \`stock\` int NOT NULL COMMENT '库存', UNIQUE INDEX \`IDX_10e129f02b3e39cf52f8d262b2\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_10e129f02b3e39cf52f8d262b2\` ON \`sku\``);
        await queryRunner.query(`DROP TABLE \`sku\``);
    }

}
