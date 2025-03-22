import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742632346649 implements MigrationInterface {
    name = 'Init1742632346649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_30a2ea197aff469140fe958a11\` ON \`spec_key\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_30a2ea197aff469140fe958a11\` ON \`spec_key\` (\`unit\`)`);
    }

}
