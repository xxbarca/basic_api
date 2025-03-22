import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742632280098 implements MigrationInterface {
    name = 'Init1742632280098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`spec_key\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(100) NOT NULL, \`unit\` varchar(30) NULL, UNIQUE INDEX \`IDX_0fd84a16b1a7804a523bd329ff\` (\`name\`), UNIQUE INDEX \`IDX_30a2ea197aff469140fe958a11\` (\`unit\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_30a2ea197aff469140fe958a11\` ON \`spec_key\``);
        await queryRunner.query(`DROP INDEX \`IDX_0fd84a16b1a7804a523bd329ff\` ON \`spec_key\``);
        await queryRunner.query(`DROP TABLE \`spec_key\``);
    }

}
