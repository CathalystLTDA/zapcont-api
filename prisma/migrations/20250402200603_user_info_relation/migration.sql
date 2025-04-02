/*
  Warnings:

  - A unique constraint covering the columns `[userInfoId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UserInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userInfoId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_userInfoId_key" ON "User"("userInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_userId_key" ON "UserInfo"("userId");
