/*
  Warnings:

  - Added the required column `updatedAt` to the `MachineScore` table without a default value. This is not possible if the table is not empty.
  Dev note: this migration file was manually edited to add the default value to the `updatedAt` column before setting it to NOT NULL

*/
-- AlterTable
ALTER TABLE "MachineScore" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
UPDATE "MachineScore" SET "updatedAt" = CURRENT_TIMESTAMP;
ALTER TABLE "MachineScore" ALTER COLUMN "updatedAt" SET NOT NULL;
