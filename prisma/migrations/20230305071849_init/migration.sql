-- CreateTable
CREATE TABLE "userGame" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "userGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userGameBiodata" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "userGameBiodata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userGameHistory" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "userGameHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userGame_username_key" ON "userGame"("username");
