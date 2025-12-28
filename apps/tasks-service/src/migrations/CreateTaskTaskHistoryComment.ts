import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTaskTaskHistoryComment1680000000000 implements MigrationInterface {
  name = 'CreateTaskTaskHistoryComment1680000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // ENUM priority
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_priority_enum') THEN
          CREATE TYPE "task_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT');
        END IF;
      END$$;
    `);

    // ENUM status
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status_enum') THEN
          CREATE TYPE "task_status_enum" AS ENUM('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE');
        END IF;
      END$$;
    `);

    // TASK
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "task" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "authorEmail" character varying,
        "description" character varying,
        "dueDate" TIMESTAMP,
        "priority" "task_priority_enum" NOT NULL DEFAULT 'MEDIUM',
        "status" "task_status_enum" NOT NULL DEFAULT 'TODO',
        "assignedEmails" text[],
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_task_id" PRIMARY KEY ("id")
      );
    `);

    // TASK HISTORY
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "task_history" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "action" character varying NOT NULL,
        "oldValue" text,
        "newValue" text,
        "taskId" uuid,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_task_history_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_task_history_task" FOREIGN KEY ("taskId")
          REFERENCES "task"("id") ON DELETE CASCADE
      );
    `);

    // COMMENT
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "comment" (
         "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "text" character varying NOT NULL,
        "author" character varying,
        "taskId" uuid,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_comment_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_comment_task" FOREIGN KEY ("taskId")
          REFERENCES "task"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "comment"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "task_history"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "task"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "task_priority_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "task_status_enum"`);
  }
}
