import { prisma } from "@/lib/db";

export async function checkUserExists(chatId: string): Promise<boolean> {
    const user = await prisma.userState.findUnique({ where: { chatId } });
    console.log('User checkUserExists exists:', user);
    return user !== null;
}
