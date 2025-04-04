import { updateTransaction } from "@/app/utils/transactions";
import { TransactionType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ transactionId: string }> }
) {
    try {
        const { transactionId } = await params;
        const { amount, description, type } = await request.json();

        if (!transactionId) {
            return NextResponse.json(
                { error: 'Transaction ID is required' },
                { status: 400 }
            );
        }

        if (type && !Object.values(TransactionType).includes(type)) {
            return NextResponse.json(
                { error: 'Invalid transaction type' },
                { status: 400 }
            );
        }

        const updatedTransaction = await updateTransaction(
            transactionId,
            amount,
            description,
            type
        );

        return NextResponse.json(updatedTransaction);
    } catch (error) {
        console.error('Error updating transaction:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}