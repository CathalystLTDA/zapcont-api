-- CreateTable
CREATE TABLE "WhatsappSession" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhatsappSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WhatsappSession_sessionId_key" ON "WhatsappSession"("sessionId");
