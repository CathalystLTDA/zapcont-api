import { PrismaClient } from "@prisma/client"
 
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const prisma = globalForPrisma.prisma || new PrismaClient()
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export async function connectToDatabase() {
  try {
    await prisma.$connect();
    return prisma;
  } catch (error) {
    throw new Error('Failed to connect to the database: ' + error);
  }
}
