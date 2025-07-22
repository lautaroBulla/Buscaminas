import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1753191722769 implements MigrationInterface {
    name = 'InitialMigration1753191722769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."games_difficulty_enum" AS ENUM('easy', 'intermediate', 'expert', 'custom')`);
        await queryRunner.query(`CREATE TABLE "games" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "help" integer NOT NULL, "seconds" numeric(8,3) NOT NULL, "difficulty" "public"."games_difficulty_enum" NOT NULL, "rows" integer NOT NULL, "cols" integer NOT NULL, "mines" integer NOT NULL, "n3BV" integer NOT NULL, "clicks" integer NOT NULL, "efficiency" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_49dc618f9811c67dec86f0d2049" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_49dc618f9811c67dec86f0d2049"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`DROP TYPE "public"."games_difficulty_enum"`);
    }

}
