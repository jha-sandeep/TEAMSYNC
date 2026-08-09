/*
  Warnings:

  - The values [ADMIN,MEMBER] on the enum `ProjectRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `ownerId` on the `Project` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ProjectRole_new" AS ENUM ('OWNER', 'MAINTAINER', 'CONTRIBUTOR');
ALTER TABLE "public"."ProjectMember" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."ProjectMember" ALTER COLUMN "role" TYPE "public"."ProjectRole_new" USING ("role"::text::"public"."ProjectRole_new");
ALTER TYPE "public"."ProjectRole" RENAME TO "ProjectRole_old";
ALTER TYPE "public"."ProjectRole_new" RENAME TO "ProjectRole";
DROP TYPE "public"."ProjectRole_old";
ALTER TABLE "public"."ProjectMember" ALTER COLUMN "role" SET DEFAULT 'CONTRIBUTOR';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_ownerId_fkey";

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "ownerId";

-- AlterTable
ALTER TABLE "public"."ProjectMember" ALTER COLUMN "role" SET DEFAULT 'CONTRIBUTOR';
