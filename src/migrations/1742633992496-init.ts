import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742633992496 implements MigrationInterface {
    name = 'Init1742633992496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`spec_value\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`value\` varchar(255) NOT NULL COMMENT '规格值', \`spec_key_id\` varchar(255) NOT NULL COMMENT '规格名ID', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`spec_value\``);
    }

}
