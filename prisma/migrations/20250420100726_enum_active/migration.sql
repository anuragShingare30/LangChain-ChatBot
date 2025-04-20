-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Createe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hallname" TEXT NOT NULL,
    "clubname" TEXT NOT NULL,
    "eventname" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "eventstatus" TEXT NOT NULL DEFAULT 'Active'
);
INSERT INTO "new_Createe" ("clubname", "date", "eventname", "eventstatus", "hallname", "id", "time") SELECT "clubname", "date", "eventname", "eventstatus", "hallname", "id", "time" FROM "Createe";
DROP TABLE "Createe";
ALTER TABLE "new_Createe" RENAME TO "Createe";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
