-- CreateTable
CREATE TABLE "UserScore" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "factoryScore" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserScore_pkey" PRIMARY KEY ("id","userId")
);

-- CreateTable
CREATE TABLE "MachineScore" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "machineName" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "userScoreId" TEXT,
    "userScoreUserId" TEXT,

    CONSTRAINT "MachineScore_pkey" PRIMARY KEY ("id","userId")
);

-- AddForeignKey
ALTER TABLE "MachineScore" ADD CONSTRAINT "MachineScore_userScoreId_userScoreUserId_fkey" FOREIGN KEY ("userScoreId", "userScoreUserId") REFERENCES "UserScore"("id", "userId") ON DELETE SET NULL ON UPDATE CASCADE;
