import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742611632505 implements MigrationInterface {
    name = 'Init1742611632505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu\` ADD UNIQUE INDEX \`IDX_4b4a83a7df70c58102259c250f\` (\`title\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu\` DROP INDEX \`IDX_4b4a83a7df70c58102259c250f\``);
    }

}
