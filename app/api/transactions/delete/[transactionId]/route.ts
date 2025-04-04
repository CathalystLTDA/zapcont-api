import { deleteTransaction } from "@/app/utils/transactions";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ transactionId: string }> }
) {
    try {
        const { transactionId } = await params;

        if (!transactionId) {
            return NextResponse.json(
                { error: 'Transaction ID is required' },
                { status: 400 }
            );
        }

        await deleteTransaction(transactionId);

        return NextResponse.json(
            { message: 'Transaction deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting transaction:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
}