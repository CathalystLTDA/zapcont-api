import { NextResponse } from 'next/server';
import { TransactionType } from '@prisma/client';
import { deleteTransaction, registerTransaction, updateTransaction } from '@/app/utils/transactions';


export async function POST(request: Request) {
    try {
        const { amount, description, type, chatId } = await request.json();

        if (!amount || !description || !type || !chatId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (!Object.values(TransactionType).includes(type)) {
            return NextResponse.json(
                { error: 'Invalid transaction type' },
                { status: 400 }
            );
        }

        const newTransaction = await registerTransaction(
            amount,
            description,
            type,
            chatId
        );

        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const { id, amount, description, type } = await request.json();

        if (!id) {
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
            id,
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

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: 'Transaction ID is required' },
                { status: 400 }
            );
        }

        await deleteTransaction(id);

        return NextResponse.json(
            { message: 'Transaction deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting transaction:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}