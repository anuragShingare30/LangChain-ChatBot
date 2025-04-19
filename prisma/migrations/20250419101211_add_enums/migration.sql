/*
  Warnings:

  - The primary key for the `Createe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `eventstatus` on the `Createe` table. All the data in the column will be lost.
  - You are about to drop the column `hallstatus` on the `Createe` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Createe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hallname" TEXT NOT NULL,
    "clubname" TEXT NOT NULL,
    "eventname" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL
);
INSERT INTO "new_Createe" ("clubname", "date", "eventname", "hallname", "id", "time") SELECT "clubname", "date", "eventname", "hallname", "id", "time" FROM "Createe";
DROP TABLE "Createe";
ALTER TABLE "new_Createe" RENAME TO "Createe";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
