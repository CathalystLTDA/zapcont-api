import { TransactionType } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function registerTransaction(
    amount: number,
    description: string,
    type: TransactionType,
    chatId: string
) {
    const newTransaction = await prisma.transaction.create({
        data: {
            chatId,
            amount,
            description,
            type,
        },
    });

    return newTransaction;
}


// Retificar lançamento (editar)
export async function updateTransaction(
    id: string,
    amount?: number,
    description?: string,
    type?: TransactionType
) {
    const updatedTransaction = await prisma.transaction.update({
        where: { id },
        data: {
            amount,
            description,
            type,
        },
    });

    return updatedTransaction;
}

// Excluir lançamento
export function deleteTransaction(id: string) {
    return prisma.transaction.delete({
        where: { id },
    });
}
